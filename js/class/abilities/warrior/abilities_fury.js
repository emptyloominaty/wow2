class Fury_Abilities {
    "Execute" = new Execute()
    "Rampage" = new Rampage()
    "Raging Blow" = new RagingBlow()
    "Bloodthirst" = new Bloodthirst()
    "Whirlwind" = new Whirlwind()
    "Charge" = new Charge()

    //Pasive
    "Enrage" = new Enrage()

    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

class Enrage extends Ability {
    constructor() {
        let name = "Enrage"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 4
        this.effect = [{name:"moveSpeed",val:0.1},{name:"increaseStat",stat:"haste",val:15}]
        this.passive = true
    }
    startCast(caster){
        applyBuff(caster, caster, this)
    }
    endCast() {
    }
}