class HealingStreamTotem extends Ability {
    constructor(ele=false) {
        let name = "Healing Stream Totem"
        let cost = 1.8
        let gcd = 1
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 15
        this.spellPower = 0.48
        this.area = {type:"circle", radius:40, duration: 15,data:{type:"hot", maxTargets:2, spellPower:this.spellPower, timer:2/*sec*/,color:"#82fffd",color2:"rgba(133,255,251,0.05)"},cast:false}
        this.petData = {
            name:"Healing Stream Totem",
            abilities:{},
            color:"#7fb8ff",
            size:4,
            do:[]
        }
        this.petDuration = 15
        if(ele) {
            this.cost = 0
        }
    }

    getTooltip() {
        return "Summons a totem at your feet for 15 sec that heals two injured party or raid members within 40 yards for "+spellPowerToNumber(this.spellPower)+" every 2 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            spawnPet(caster,"totem","Healing Stream Totem",caster.x,caster.y,this)

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,false,this.area.radius)

            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
    }
}
