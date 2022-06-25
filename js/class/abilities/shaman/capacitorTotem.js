class CapacitorTotem extends Ability {
    constructor(ele=false) {
        let name = "Capacitor Totem"
        let cost = 2
        let gcd = 1
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.effect = [{name:"stun"}]
        this.duration = 3
        this.area = {type:"circle", radius:8, duration:2,data:{type:"stun",color:"#4eff40",color2:"rgba(103,163,255,0.3)"},cast:false}
        this.petData = {
            name:"Capacitor Totem",
            abilities:{},
            color:"rgb(23,76,152)",
            size:3,
            do:[]
        }
        this.petDuration = 2
        this.castPosition = {x:0,y:0}

        if (ele) {
            this.cost = 0
        }
    }

    getTooltip() {
        return "Summons a totem at the target location that gathers electrical energy from the surrounding air and explodes after 2 sec, stunning all enemies within 8 yards for 3 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            spawnPet(caster,"totem",this.petData.name,this.castPosition.x,this.castPosition.y,this)

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

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
