pragma solidity ^0.4.16;

contract LAF {

    struct Item{
    address owner;
    address founder;
    bytes name;
    bytes email;
    bytes phone;
    bytes location;
    bytes imageUrl;
    uint prize;
    }

    struct User{
    bytes[] items;
    bool exists;
    }

    mapping (bytes => Item) items;
    mapping (address => User) users;

    event PrizePaid(address founder, uint amount);
    event ItemFound(bytes item, address founder, address owner);
    event ItemLost(bytes name, bytes email, bytes phone, bytes location, uint prize);
    event ItemRegistered(address user, bytes name, bytes email, bytes phone, bytes location, bytes imageUrl);

    modifier onlyNewItem(bytes _hash) {
        require(items[_hash].owner == 0);
        _;
    }

    modifier onlyRegisteredItem(bytes _hash) {
        require(items[_hash].owner != 0);
        _;
    }

    modifier onlyItemOwner(bytes _hash) {
        require(items[_hash].owner == msg.sender);
        _;
    }

    function registerItem(bytes _hash, bytes _name, bytes _email, bytes _phone, bytes _location, bytes _imageUrl) onlyNewItem(_hash) returns (bool) {
        if (!users[msg.sender].exists){
            bytes[] emptyArr;
            users[msg.sender] = User({
            items: emptyArr,
            exists: true
            });
        }

        items[_hash] = Item({
        owner: msg.sender,
        founder: 0,
        name: _name,
        email: _email,
        phone: _phone,
        location: _location,
        imageUrl: _imageUrl,
        prize: 0
        });

        users[msg.sender].items.push(_hash);

        ItemRegistered(msg.sender, _name, _email, _phone, _location, _imageUrl);

        return true;
    }

    function lostItem(bytes _hash, bytes _location) payable onlyRegisteredItem(_hash) returns (bool) {
        items[_hash].prize = msg.value;
        ItemLost(items[_hash].name, items[_hash].email, items[_hash].phone, _location, items[_hash].prize);

        return true;
    }

    function foundItem(bytes _hash) onlyRegisteredItem(_hash) returns (bool) {
        require (items[_hash].founder == 0);

        uint amountToSend = items[_hash].prize / 2;
        items[_hash].prize = items[_hash].prize - amountToSend;
        items[_hash].founder = msg.sender;
        msg.sender.transfer(amountToSend);

        ItemFound(_hash, msg.sender, items[_hash].owner);
        PrizePaid(msg.sender, amountToSend);

        return true;
    }

    function confirmFoundItem(bytes _hash) onlyItemOwner(_hash) returns (bool) {
        if (items[_hash].founder == 0) return;

        uint amountToSend = items[_hash].prize;
        items[_hash].prize = 0;
        items[_hash].founder.transfer(amountToSend);
        items[_hash].founder = 0;

        PrizePaid(msg.sender, amountToSend);

        return true;
    }

    function getNumberOfItems() constant returns (uint) {
        return users[msg.sender].items.length;
    }

    function getItemWithPosition(uint _position) constant returns (bytes) {
        require(_position < users[msg.sender].items.length);

        return users[msg.sender].items[_position];
    }

    function getItemOwner(bytes _hash) constant returns (address) {
        return items[_hash].owner;
    }

    function getItemName(bytes _hash) constant returns (bytes) {
        return items[_hash].name;
    }

    function getItemEmail(bytes _hash) constant returns (bytes) {
        return items[_hash].email;
    }

    function getItemPhone(bytes _hash) constant returns (bytes) {
        return items[_hash].phone;
    }

    function getItemPrize(bytes _hash) constant returns (uint) {
        return items[_hash].prize;
    }

    function getItemLocation(bytes _hash) constant returns (uint) {
        return items[_hash].location;
    }

    function getItemImageUrl(bytes _hash) constant returns (uint) {
        return items[_hash].imageUrl;
    }
}