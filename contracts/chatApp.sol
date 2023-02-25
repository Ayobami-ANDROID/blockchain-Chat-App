
//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract ChatApp{

    struct user{
        string name;
        friend[] frienList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timeStamp;
        string msg;
    }

    struct AllUserStruck{
        string name;
        address accountAddress;
    }

    AllUserStruck[] getAllUsers;

    mapping (address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    function checkUserExist(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }

    function createAccount(string calldata name) external{
        require(checkUserExist(msg.sender) == false,"user already exist");
        require(bytes(name).length > 0,"username cannot be empty");
        userList[msg.sender].name = name;
        getAllUsers.push(AllUserStruck(name,msg.sender));
    }

    function getUserName(address pubkey) external view returns(string memory){
        require(checkUserExist(pubkey) == false,"User is not registered");
        return userList[pubkey].name;
    }

    function addFriend(address friend_key,string calldata name)external{
        require(checkUserExist(msg.sender) == false,"Create an account first");
        require(checkUserExist(friend_key) == false,"User is not registered!");
        require(msg.sender != friend_key,"Users cannot add themselves as a friend");
        require(checkAlreadyFriends(msg.sender,friend_key)==false,"These users are already friends");
        _addfriend(msg.sender, friend_key,name);
        _addfriend(friend_key,msg.sender,userList[msg.sender].name);
    }

    function checkAlreadyFriends(address pubKey1,address pubkey2) internal view returns(bool){
        if(userList[pubKey1].frienList.length > userList[pubkey2].frienList.length){
            address tmp = pubKey1;
            pubKey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint256 i =0; i< userList[pubKey1].frienList.length; i++){
            if(userList[pubKey1].frienList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addfriend(address me,address friend_key,string memory name)internal{
         friend memory newFriend = friend(friend_key,name);
         userList[me].frienList.push(newFriend);
    }

    function getMyFriendList() external view returns (friend[] memory){
        return userList[msg.sender].frienList;
    }

    function _getChatCode(address pubKey1,address pubKey2) internal pure returns(bytes32){
        if(pubKey1 > pubKey2){
            return keccak256(abi.encodePacked(pubKey1,pubKey2));
        }else{
            return keccak256(abi.encodePacked(pubKey2,pubKey1));
        }
    }

    function sendMessage(address friend_key,string calldata _msg) external{
        require(checkUserExist(msg.sender),"create an account first");
        require(checkUserExist(friend_key),"user is not registered");
        require(checkAlreadyFriends(msg.sender,friend_key),"you are not friend with user ");
        bytes32 chatcode = _getChatCode(msg.sender,friend_key);
        message memory newMsg = message(msg.sender,block.timestamp,_msg );
        allMessages[chatcode].push(newMsg);
    }

    function readMessage(address friend_key)external view returns(message[] memory){
        bytes32 chatcode = _getChatCode(msg.sender,friend_key);
        return allMessages[chatcode];
    }

    function getAllAppUsers() public view returns(AllUserStruck[] memory){
        return getAllUsers;
    }
}