pragma solidity ^0.4.0;

contract LAF {
    
    struct Item{
        address owner;
        address founder;
        string name;
        string email;
        string phone;
        string location;
        uint prize;
    }

    struct User{
        bytes[] items;
        bool isValue;
    }

    mapping (bytes => Item) items;
    mapping (address => User) users;

    event PrizePaid(address founder, uint amount);
    event ItemFound(bytes item, address founder);
    event ItemLost(string name, string email, string phone, string location, uint prize);

    function registerItem(bytes hash, string name, string email, string phone) onlyNewItem(hash) returns (bool) {
        if (!users[msg.sender].isValue){
            users[msg.sender] = User({
                isValue: true,
                items: new bytes[](0)
            });
        }

        items[hash] = Item({
            owner: msg.sender,
            founder: 0,
            name: name,
            email: email,
            phone: phone,
            location: '',
            prize: 0
        });
        users[msg.sender].items.push(hash);

        return true;
    }

    function lostItem(bytes hash, string location) payable onlyRegisteredItem(hash) returns (bool) {
        items[hash].prize = msg.value;
        ItemLost(items[hash].name, items[hash].email, items[hash].phone, location, items[hash].prize);

        return true;
    }

    function foundItem(bytes hash) payable onlyRegisteredItem(hash) returns (bool) {
        if (items[hash].founder != 0)
            return;

        uint amountToSend = items[hash].prize / 2;
        items[hash].prize = items[hash].prize - amountToSend;
        items[hash].founder = msg.sender;
        msg.sender.transfer(amountToSend);

        ItemFound(hash, msg.sender);
        PrizePaid(msg.sender, amountToSend);

        return true;
    }

    function confirmFoundItem(bytes hash) payable onlyItemOwner(hash) returns (bool) {
        if (items[hash].founder == 0)
            return;

        uint amountToSend = items[hash].prize;
        items[hash].prize = 0;
        items[hash].founder.transfer(amountToSend);
        items[hash].founder = 0;

        PrizePaid(msg.sender, amountToSend);

        return true;
    }

    function getNumberOfItems() constant returns (uint) {
        return users[msg.sender].items.length;
    }

    function getItemWithPosition(uint position) constant returns (bytes) {
        require(position < users[msg.sender].items.length);

        return users[msg.sender].items[position];
    }

    function getItemOwner(bytes hash) constant returns (address) {
        return items[hash].owner;
    }

    function getItemName(bytes hash) constant returns (string) {
        return items[hash].name;
    }

    function getItemEmail(bytes hash) constant returns (string) {
        return items[hash].email;
    }

    function getItemPhone(bytes hash) constant returns (string) {
        return items[hash].phone;
    }

    function getItemPrize(bytes hash) constant returns (uint) {
        return items[hash].prize;
    }

    modifier onlyNewItem(bytes hash) {
        require(items[hash].owner == 0);
        _;
    }

    modifier onlyRegisteredItem(bytes hash) {
        require(items[hash].owner != 0);
        _;
    }

    modifier onlyItemOwner(bytes hash) {
        require(items[hash].owner == msg.sender);
        _;
    }


}