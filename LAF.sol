pragma solidity ^0.4.0;

contract LAF {
    
    struct Item{
        address owner;
        string name;
        string email;
        string phone;
        uint prize;
    }
    
    mapping (address => Item) items;
    
    event PrizePaid(address founder, uint amount);
    event ItemFound(address item, address founder);
    event ItemLost(string name, string email, string phone, uint prize);
    
    function registerItem(address addr, string name, string email, string phone) returns (bool) {
        if (items[addr].owner != 0) 
            return false;
            
        items[addr] = Item({
            owner: msg.sender,
            name: name,
            email: email,
            phone: phone,
            prize: 0
        });
        
        return true;
    }
    
    function lostItem(address addr) payable returns (bool) {
        if (items[addr].owner == 0)
            return false;
            
        items[addr].prize = msg.value;
        ItemLost(items[addr].name, items[addr].email, items[addr].phone, items[addr].prize);

        return true;
    }
    
    function foundItem(address addr) payable returns (bool) {
        if (items[addr].owner == 0)
            return false;
            
        uint amountToSend = items[addr].prize / 2;
        items[addr].prize = items[addr].prize - amountToSend;
        msg.sender.send(amountToSend);
        
        ItemFound(addr, msg.sender);
        PrizePaid(msg.sender, amountToSend);
        
        return true;
    }
    
    function confirmFoundItem(address addr) payable returns (bool) {
        if (items[addr].owner != msg.sender)
            return false;
            
        uint amountToSend = items[addr].prize;
        items[addr].prize = 0;
        msg.sender.send(amountToSend);
        PrizePaid(msg.sender, amountToSend);
        
        return true;
    }
    
    function getItemOwner(address addr) constant returns (address) {
        return items[addr].owner;
    }
    
    function getItemName(address addr) constant returns (string) {
        return items[addr].name;
    }
    
    function getItemEmail(address addr) constant returns (string) {
        return items[addr].email;
    }
    
    function getItemPhone(address addr) constant returns (string) {
        return items[addr].phone;
    }
    
    function getItemPrize(address addr) constant returns (uint) {
        return items[addr].prize;
    }
}
