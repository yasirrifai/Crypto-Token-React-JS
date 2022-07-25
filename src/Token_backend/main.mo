import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";




actor  Token {
   let owner: Principal = Principal.fromText("Your Pricipal ID");
   let totalAmount: Nat = 10000;
   let symbol:Text = "YAM";

   private stable var balanceEntries: [(Principal, Nat)] = [];

   private var balance = HashMap.HashMap<Principal, Nat>(1,Principal.equal, Principal.hash);
   if(balance.size() < 1) {
        balance.put(owner, totalAmount);
    };

  public query func balanceRemain(who: Principal): async Nat {

    let balances: Nat = switch((balance.get(who))) {
      case null 0;
      case (?result) result;
    };
    return balances;
  };

  public query func getSymbol(): async Text {
    return symbol;
  };

  public shared(msg) func payOut() : async Text {

    if(balance.get(msg.caller) == null){
       let amount = 100;
       let results = await transfer(msg.caller, amount);
    return results;
    }
    else {
      return "You already claimed";
    }
   
  };

  public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
    let fromBalance = await balanceRemain(msg.caller);
    if(fromBalance > amount) {
      let newFromBalance: Nat = fromBalance - amount;
      balance.put(msg.caller,newFromBalance);
      
      let toBalance = await balanceRemain(to);
      let newToBalance = toBalance + amount;
      balance.put(to, newToBalance);

      return "Successfully transfered";
    }
    else {
       return "Insufficient fund";
    }
  };


  system func preupgrade(){
    balanceEntries:= Iter.toArray(balance.entries());
  };
  system func postupgrade(){
    balance:= HashMap.fromIter<Principal, Nat>(balanceEntries.vals(),1,Principal.equal, Principal.hash);
    if(balance.size() < 1) {
        balance.put(owner, totalAmount);

    };
  };
};
