class SpiritLinkTotem extends Ability {
    constructor() {
        let name = "Spirit Link Totem"
        let cost = 2.2
        let gcd = 1
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 6
        this.area = {type:"circle2", radius:10, duration:6,data:{type:"spiritLinkTotem", timer:1/*sec*/,color:"#4eff40",color2:"rgba(105,255,131,0.3)"},cast:false}
        this.petData = {
            name:"Spirit Link Totem",
            abilities:{},
            color:"rgb(104,152,74)",
            size:3,
            do:[]
        }
        this.petDuration = 6
        //DR in area.js
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Summons a totem at the target location for 6 sec, which reduces damage taken by all party and raid members within 10 yards by 10%. Immediately and every 1 sec, the health of all affected players is redistributed evenly."
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
