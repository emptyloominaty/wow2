class MassDispel extends Ability {
    constructor(shadow=false) {
        let name = "Mass Dispel"
        let cost = 8 //8?
        let gcd = 1.5
        let castTime = 1.5
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 30
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)
        this.castPosition = {x:0,y:0}
        this.area = {type:"circle", radius:15, duration: 0.3,data:{type:"no",color:"#a2fffc",color2:"rgba(141,224,255,0.24)",cast:false}}

        if (shadow) {
            this.cost = -6
        }
    }

    getTooltip() {
        //TODO: Potent enough to remove Magic that is normally undispellable  ?
        return "Dispels magic in a 15 yard radius, removing all harmful Magic from 5 friendly targets and 1 beneficial Magic effects from 5 enemy targets."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
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
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)
        for (let i = 0; i<enemies.length; i++) {
            if (!enemies[i].isDead || this.checkDistance(this.castPosition,enemies[i],15,true)) {
                dispelEnemy(caster,enemies[i],1)
            }
        }
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead || this.checkDistance(this.castPosition,friendlyTargets[i],15,true)) {
                dispel(caster,friendlyTargets[i],"magic")
            }
        }
        caster.useEnergy(this.cost)
        this.setCd()
        return true

    }

}
