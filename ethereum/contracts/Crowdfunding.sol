pragma solidity ^0.8.9;

contract CrowdfundFactory {
    address[] public allDeployedContracts;

    function createContract(uint minimum) public {
        address newCrowdfundCampaign = address(new Crowdfund(minimum, msg.sender));

        allDeployedContracts.push(newCrowdfundCampaign);
    }

    function getAllDeployedContract() public view returns (address[] memory) {
        return allDeployedContracts;
    }
}

contract Crowdfund {

    struct Request {
        string description;
        uint value;
        bool complete;
        uint approvalCount;
        address recipient;
        mapping(address => bool) approvals;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;

    constructor(uint minimum, address creator){
        minimumContribution = minimum;
        manager = creator;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string calldata _description, uint _value, address _recipient) public restricted{
        Request storage newRequest = requests.push();
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
        // Request memory newRequest = Request({
        //     description: _description,
        //     value: _value,
        //     recipient: _recipient,
        //     complete: false,
        //     approvalCount: 0
        // });
        // requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        //check if person have contributed
        require(approvers[msg.sender]);
        //check if person alreay voted to approve
        Request storage request = requests[index];
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        // check if the request already completed
        require(!request.complete);
        // check the approvers are more than half of the totoal contributere
        require(request.approvalCount > (approversCount / 2));
        //send money to recipient
        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

}
