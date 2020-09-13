pragma solidity ^0.4.21;
contract GiveAccess {
    mapping (string => bytes32[]) private hashmap;


    constructor() public {

    }

    function GrantAccess(string combinedkey,bytes32 hash1, bytes32 hash2) public {
        hashmap[combinedkey].push(hash1);
        hashmap[combinedkey].push(hash2);
    }

    function ViewAccess(string combinedkey) public view returns (bytes32[]) {
        return hashmap[combinedkey];
    }

    function RevokeAccess(string combinedkey) public {
        delete hashmap[combinedkey];
    }
}
