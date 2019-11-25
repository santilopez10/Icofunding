

window.addEventListener("load", async function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== "undefined") {
        //Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);

    } else {
        console.log("No web3? You should consider trying MetaMask!");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(
        new Web3.providers.HttpProvider("https://localhost:8080")
        );
    }

    ethereum.enable();
    var w3 = window.web3.eth;
    var ABI = [{"constant": false,"inputs": [{"internalType": "address","name": "approvee","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "newTokens","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "purchaseToken","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"internalType": "uint256","name": "etherToToken","type": "uint256"}],"name": "setTokenPrice","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "address","name": "receiver","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "address","name": "fromAcct","type": "address"},{"internalType": "address","name": "toAcct","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "withdraw","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": true,"stateMutability": "payable","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": true,"internalType": "address","name": "receiver","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Transfer","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "approver","type": "address"},{"indexed": true,"internalType": "address","name": "approvee","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Approval","type": "event"},{"constant": true,"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "decimals","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "valueToken","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "whitelisted","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"internalType": "address","name": "toWhitelist","type": "address"}],"name": "whitelist","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"}];

    contract = new w3.Contract(ABI, "0x9e225f9ad971064d1f045b73a47e58e4ecbf2074");
    console.log(window.web3.version);
    userOptions();
    console.log(contract);
    userHistory();
    
});

//-----------------------------------------------------------------Home Page----------------------------------------------------------------------------

async function getBalanceOf() {
    var address = document.getElementById("addressB").value; 
    var balance = await contract.methods.balanceOf(address).call();
    document.getElementsByClassName("site")[0].innerHTML += '<div class="alert"></div><div class="alert-box">hello</div>';
    alert("Address: " + address + "\nBalance: " + balance);
} 

async function sendSan() {
    accounts = await web3.eth.getAccounts();
    var sender = accounts[0];
    var address = document.getElementById("addressS").value;
    var amount = document.getElementById("amountS").value;
    
    var completed = await contract.methods.transfer(address, amount).send({from:sender});
    console.log(completed);
    
    alert("Amount Sent: " + amount + " wei\nFrom Address: " + sender + "\nTo Address: " + address);
}

async function approve() {
    accounts = await web3.eth.getAccounts();
    var sender = accounts[0];
    var address = document.getElementById("addressA").value;
    var amount = document.getElementById("amountA").value;

    var completed = await contract.methods.approve(address, amount).send({from:sender});
    console.log(completed);

    alert("Wallet: " + sender + " Approved Wallet: " + addressA + " For The Amount Of " + amountA);
}

async function transferFrom() {
    accounts = await web3.eth.getAccounts();
    var sender = accounts[0];
    var from = document.getElementById("fromTF").value;
    var to = document.getElementById("toTF").value;
    var amount = document.getElementById("amountTF").value;

    var completed = await contract.methods.transferFrom(from, to, amount).send({from:sender});
    console.log(completed);
    
    alert("Wallet: " +sender+ "\nSent " +amountTF+ "\nFrom Wallet: " +fromTF+ "\nTo Wallet: " +toTF);
}

async function purchaseToken() {
    accounts = await web3.eth.getAccounts();
    var sender = accounts[0];
    var amount = document.getElementById("moneySent").value;

    var completed = await contract.methods.purchaseToken().send({from:sender, value:amount});
    console.log(completed);

    alert(amount+ " Wei Sent To Purchase Tokens.")
}

function toggleUser(element) {
    var kids = document.getElementById("options").children;
    for(var i = 0; i < kids.length; i++) {
        kids[i].classList.remove("active");
    }
    var content = element.id + "t";
    kids = document.getElementById("content").children;
    for(var i = 0; i < kids.length; i++) {
        if(content === kids[i].id) kids[i].style.display = "block";
        else kids[i].style.display = "none";
    }
    element.classList.add("active");
}


//-----------------------------------------------------------------ADMIN PAGE---------------------------------------------------------------------------

async function createTokens() {
    accounts = await web3.eth.getAccounts();
    var sender = accounts[0];
    var address = document.getElementById("addressN").value;
    var amount = document.getElementById("amountN").value;

    var completed = await contract.methods.newTokens(address, amount).send({from:sender});
    console.log(completed);
    
    alert(amount + " Tokens Created And Sent To Address: " + address);
}

async function setTokenPrice() {
    accounts = await web3.eth.getAccounts();
    var sender = accounts[0];
    var price = document.getElementById("price").value;
    var completed = await contract.methods.setTokenPrice(price).send({from:sender});
}

async function withdraw() {
    accounts = await web3.eth.getAccounts();
    var sender = accounts[0];
    var amount = document.getElementById("amountW").value;

    var completed = await contract.methods.withdraw(amount).send({from:sender});
    console.log(completed);
    
    alert("Wallet: " +sender+ " Withdrew " +amountW);
}

async function whitelistAddress() {
    accounts = await web3.eth.getAccounts();
    var sender = accounts[0];
    var whitelist = document.getElementById("whitelistAddress").value;

    var completed = contract.methods.whitelist(whitelist).send({from:sender});
    console.log(completed);
    
    alert("Wallet: " +whitelist+ "\nAdded to Whitelist");
}

function toggleAdmin(element) {
    var kids = document.getElementById("options").children;
    for(var i = 0; i < kids.length; i++) {
        kids[i].classList.remove("active");
    }
    var content = element.id + "a";
    kids = document.getElementById("content").children;
    for(var i = 0; i < kids.length; i++) {
        if(content === kids[i].id) kids[i].style.display = "block";
        else kids[i].style.display = "none";
    }
    element.classList.add("active");
}

//-----------------------------------------------------------------Right Container-------------------------------------------------------------------

async function userOptions() {
    accounts = await web3.eth.getAccounts();
    var user= accounts[0];
    var shortUser = user.substring(0,5) + "..." + user.substring(user.length-5,user.length-1);    
    document.getElementById("userWallet").innerHTML = shortUser;
    var balance = await contract.methods.balanceOf(user).call();
    document.getElementById("userBalance").innerHTML = balance + " SAN";
    var whitelisted = await contract.methods.whitelisted(user).call();
    document.getElementById("whitelist-text").innerHTML = whitelisted ? "Whitelisted":"Not Whitelisted Yet";
    var admin = await contract.methods.admin().call();
    if(user != admin && window.location.href.includes("admin")) window.location = "index.html";
    else if(user == admin && !window.location.href.includes("admin")) {
        document.getElementById("whitelist-text").innerHTML += '<a href="admin.html" class="admin-button">Admin Options</a>';
    }
}

async function userHistory() {
    var events = await contract.getPastEvents("Transfer", {
        fromBlock: 0,
        toBlock: contract.lastBlock
    });
    for(var i = events.length-1; i >= 0; i--) {
        console.log(events[i]);
        
        if(events[i].returnValues[1] === accounts[0]) {
            var hist = document.createElement("div");           
        
            hist.classList.add("history-grid");
            const badDate = await web3.eth.getBlock(events[i].blockNumber, (error, block) => {
                const timestamp = block.timestamp;
                var date = new Date(timestamp * 1000);
                var s = date.toUTCString().split(" ");
                hist.innerHTML += '<div class="history-date"><ul><li class="history-month">'+s[2].toUpperCase()+'</li><li class="history-day">'+s[1]+'</li></div>';
            });;
        
            hist.innerHTML += '<div style="border-top: 1px solid lightgray"><img src="SantiCoin.jpg" width="30" height="height" class="logo"></div>';
            
            hist.innerHTML += '<div class="history-center-div"><img class="history-text" src="planeR.svg" width="40" height="25"></div>';
            hist.innerHTML += '<h2 class="history-number-r">+'+events[i].returnValues[2]+"</h2>";   
            document.getElementById("history").appendChild(hist);       
        }
        else if(events[i].returnValues[0] === accounts[0]) {
            var hist = document.createElement("div");           
        
            hist.classList.add("history-grid");
            const badDate = await web3.eth.getBlock(events[i].blockNumber, (error, block) => {
                const timestamp = block.timestamp;
                var date = new Date(timestamp * 1000);
                var s = date.toUTCString().split(" ");
                hist.innerHTML += '<div class="history-date"><ul><li class="history-month">'+s[2].toUpperCase()+'</li><li class="history-day">'+s[1]+'</li></div>';
            });;
        
            hist.innerHTML += '<div style="border-top: 1px solid lightgray"><img src="SantiCoin.jpg" width="30" height="height" class="logo"></div>';
            
            hist.innerHTML += '<div class="history-center-div"><img class="history-text" src="planeS.svg" width="40" height="25"></div>';
            hist.innerHTML += '<h2 class="history-number-s">-'+events[i].returnValues[2]+"</h2>";
            document.getElementById("history").appendChild(hist); 
        }
        
    }
    
}

//-----------------------------------------------------------------Miscellaneous---------------------------------------------------------------------------

async function copyAddress() {
    navigator.clipboard.writeText(accounts[0]).then(function () {
        console.log("Copying " +accounts[0]+ " to clipboard was a success!");
    });
    var popup = document.getElementById("popup");
    popup.innerText = "Copied!";
}
