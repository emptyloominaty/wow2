class ManaTideTotem extends Ability {
    constructor() {
        let name = "Mana Tide Totem"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 180
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 20
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 8
        this.area = {type:"circle", radius:this.range, duration:8,data:{type:"manaTideTotem",color:"#82fffd",color2:"rgba(3,116,255,0.02)"}}
        this.petData = {
            name:"Mana Tide Totem",
            abilities:{},
            color:"#7fb8ff",
            size:4,
            do:[]
        }
        this.petDuration = 8
    }

    getTooltip() {
        return "Summons a Mana Tide Totem at the feet of the caster for 8 sec, granting 100% increased mana regeneration to allies within 10 yds."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            spawnPet(caster,"totem","Mana Tide Totem",caster.x,caster.y,this)

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,true,this.area.radius)
            applyBuff(caster,caster,this)

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
