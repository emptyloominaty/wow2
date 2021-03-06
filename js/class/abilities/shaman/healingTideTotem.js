class HealingTideTotem extends Ability {
    constructor() {
        let name = "Healing Tide Totem"
        let cost = 4.32 //% mana
        let gcd = 1
        let castTime = 0
        let cd = 180
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.35


        this.area = {type:"circle", radius:40, duration:12,data:{type:"hot", maxTargets:"all", spellPower:0.35, timer:2/*sec*/,color:"#82fffd",color2:"rgba(167,255,171,0.05)"}}

        this.effect = []
        this.duration = 12
        this.petData = {
            name:"Healing Tide Totem",
            abilities:{},
            color:"#77a6ff",
            size:4,
            do:[]
        }
        this.petDuration = 12
    }

    getTooltip() {
        return "Summons a totem at your feet for 12 sec, which pulses every 2 sec, healing all party or raid members within 40 yards for "+(((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100)))*6).toFixed(0)+" total. "
    }

    run(caster) {
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

    endCast(caster) {
    }
}
