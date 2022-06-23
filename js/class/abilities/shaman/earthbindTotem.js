class EarthbindTotem extends Ability {
    constructor() {
        let name = "Earthbind Totem"
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
        this.effect = [{name:"moveSpeed",val:0.5}]
        this.duration = 5
        this.area = {type:"circle", radius:8, duration:20,data:{type:"applyDebuff",color:"#4eff40",color2:"rgba(103,163,255,0.3)"},cast:false}
        this.petData = {
            name:"Earthbind Totem",
            abilities:{},
            color:"rgb(23,76,152)",
            size:3,
            do:[]
        }
        this.petDuration = 20

        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Summons an Earth Totem at the target location for 20 sec that slows the movement speed of enemies within 10 yards by 50%."
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
