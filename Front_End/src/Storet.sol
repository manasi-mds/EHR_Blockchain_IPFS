pragma solidity ^0.4.21;

contract Storet {
  
  mapping (string => bytes32[]) private hashmap;
  string[] public patientArray;
  uint256 count = 0;

  constructor() public {

  }

  function storeHash(string patientkey,bytes32 hash1,bytes32 hash2) public {
     // bytes32 temp = stringToBytes32(hash);
    if(hashmap[patientkey].length==0)
    {
        count++;
        patientArray.push(patientkey);
    }
      hashmap[patientkey].push(hash1);
      hashmap[patientkey].push(hash2);
      
  }

function getPatientHash(string hash) view public returns (bytes32[]) {
    return (hashmap[hash]);
  }
  
function getListLength() view public returns (uint256) {
    return (count);
  }
}