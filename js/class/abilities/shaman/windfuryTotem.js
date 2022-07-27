class WindfuryTotem extends Ability {
    constructor() {
        let name = "Windfury Totem"
        let cost = 4.32 //% mana
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.35


        this.area = {type:"circle", radius:30, duration:120,data:{type:"applyBuff", maxTargets:"all", timer:0.98/*sec*/,color:"#82fffd",color2:"rgba(167,255,171,0.05)"}}

        this.effect = []
        this.duration = 1.49
        this.petData = {
            name:"Windfury Totem",
            abilities:{},
            color:"#b97dff",
            size:4,
            do:[]
        }
        this.petDuration = 120
    }

    getTooltip() {//Party members, Limit 1?
        return "Summons a Windfury Totem with 5 health at the feet of the caster for 2 min. Raid members within 30 yds have a 20% chance when they main-hand auto-attack to swing an extra time."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            spawnPet(caster,"totem","Healing Tide Totem",caster.x,caster.y,this)

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

}
