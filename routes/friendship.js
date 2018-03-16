const express = require('express');
const router = express.Router();
const Query = require('../models/query.js');
//status 1: pending

const FRIENDSHIP_STATUS = [
    'none',
    'pending',
    'accepted'
];
function checkFriendshipStatus(loggedInUserId, otherUserId){
    //check if the logged in user is the recipient
    let recipient_id = loggedInUserId;
    let sender_id = otherUserId;

    return Query.dbGetFriendshipStatusIfRecipient(sender_id, recipient_id).then(result=>{
        if(result.length){
            return  {
                whoAreYou: 'recipient',
                friendshipId: result[0].id,
                status: result[0].status
            };
        }else{
            //check if logged in user is the sender
            let sender_id = loggedInUserId;
            let recipient_id = otherUserId;
            return Query.dbGetFriendshipStatus(sender_id, recipient_id).then(result=>{
                if(result.length){
                    return {
                        whoAreYou: 'sender',
                        friendshipId: result[0].id,
                        status: result[0].status
                    };
                }else{
                    return null;
                }
            }).catch(err=>{
                console.log('Something went wrong', err);
            });
        }
    }).catch(err=>{
        console.log('Something went wrong while checking the sender-recipient status.', err);
    });
}

router.get('/friendstatus/get/:id', (req,res)=>{
    let loggedInUserId = req.session.user.id;
    let otherUserId = req.params.id;
    checkFriendshipStatus(loggedInUserId, otherUserId).then(answer=>{
        if(!answer){
            res.json({
                sentRequestStatus: null,
                receivedRequestStatus: null,
                friendshipId: -1
            });
        }else{
            if(answer.whoAreYou == 'sender'){
                res.json({
                    sentRequestStatus: FRIENDSHIP_STATUS[answer.status],
                    receivedRequestStatus: null,
                    friendshipId: answer.friendshipId
                });
            }else if(answer.whoAreYou == 'recipient'){
                res.json({
                    sentRequestStatus: null,
                    receivedRequestStatus: FRIENDSHIP_STATUS[answer.status],
                    friendshipId: answer.friendshipId
                });
            }
        }
    });
});

router.get('/friendstatus/update/:id', (req,res)=>{
    let loggedInUserId = req.session.user.id;
    let otherUserId = req.params.id;
    checkFriendshipStatus(loggedInUserId, otherUserId).then(answer=>{
        if(!answer){
            //no relationship found
            return Query.dbInsertFriendshipStatus(loggedInUserId, otherUserId).then(result=>{
                if(result[0].id){
                    res.json({
                        sentRequestStatus: FRIENDSHIP_STATUS[result[0].status],
                        friendshipId: result[0].id
                    });
                }
            }).catch((err)=>{
                console.log('Something wrong while making the friend request.', err);
            });
        }else{
            if(answer.whoAreYou=='sender'){
                let statusUpdate;
                if(answer.status==1||answer.status==2){
                    //if the request ist pending or accepted, you'd like to cancel or unfriend user
                    //in both cases that means setting friendship status to 0
                    statusUpdate = 0;
                }else if(answer.status==0){
                    //if the request has been canceled or a person unfriended, the status is 0
                    //to make a friend request again set it to 1
                    statusUpdate = 1;
                }
                return Query.dbUpdateFriendshipStatus(statusUpdate, answer.friendshipId).then(result=>{
                    res.json({
                        sentRequestStatus: FRIENDSHIP_STATUS[result[0].status],
                        receivedRequestStatus: null
                    });
                }).catch(err=>{
                    console.log('Could not update the friendship status. Please try later.', err);
                });
            }else if(answer.whoAreYou=='recipient'){
                let statusUpdate;
                if(answer.status == 1){
                    statusUpdate = 2; //jump to accept
                }else if(answer.status == 2){
                    statusUpdate = 0; //unfriend
                }
                return Query.dbUpdateFriendshipStatus(statusUpdate, answer.friendshipId).then(result=>{
                    res.json({
                        receivedRequestStatus: FRIENDSHIP_STATUS[result[0].status],
                        sentRequestStatus: null
                    });
                }).catch(err=>{
                    console.log('Could not update the friendship status. Please try later.', err);
                });
            }
        }
    });
});
router.get('/friendstatus/reject/:id', (req,res)=>{
    let friendshipId = req.params.id;
    let statusUpdate = 0;
    Query.dbUpdateFriendshipStatus(statusUpdate, friendshipId).then(result=>{
        res.json({
            receivedRequestStatus: FRIENDSHIP_STATUS[result[0].status]
        });
    });
});

router.get('/friends/get', (req,res)=>{
    let userid = req.session.user.id;
    Query.dbGetFriends(userid).then(result=>{
        result = [].concat.apply([], result)
        res.json(result);
    });
})
module.exports = router;
