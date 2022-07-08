class InfernalStrike extends Ability {
    constructor() {
        let name = "Infernal Strike"
        let cost = 0
        let gcd = 0.8
        let castTime = 0
        let cd = 20
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.31122*1.25
        this.effect = [{name:"moveToPoint",val:7,dist:0.5,target:{}}]
        this.duration = 2.5
        this.caster = {}
        this.canCastWhileRooted = false
        this.castPosition = {x:0,y:0}
    }


    getTooltip() {
        return "Leap through the air toward a targeted location, dealing "+spellPowerToNumber(this.spellPower)+" Fire damage to all enemies within 6 yards."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.isCasting) {
                caster.isCasting = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }
            caster.isRolling = true

            this.setGcd(caster)
            this.setCd()
            this.caster = caster
            this.effect[0].target = {x:this.castPosition.x+1,y:this.castPosition.y+1}
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(caster) {
        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],6,true) ) {
                doDamage(caster, enemies[i], this)
            }
        }
        if (caster.abilities["Abyssal Strike"].talentSelect) {
            caster.abilities["Sigil of Flame"].createArea(caster)
        }
        caster.isRolling = false
    }
}
