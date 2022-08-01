class Earthquake extends Ability {
    constructor() {
        let name = "Earthquake"
        let cost = 60
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.391

        //TODO:sometimes knocking down enemies.
        this.area = {type:"circle", radius:10, duration: 10,data:{type:"dot", maxTargets:"all", spellPower:this.spellPower, timer:1/*sec*/,color:"#82fffd",color2:"rgba(133,71,16,0.09)"},cast:false}
        this.castPosition = {x:0,y:0}

    }

    getTooltip() {
        return  "Causes the earth within 8 yards of the target location to tremble and break, dealing "+((player.stats.primary * this.spellPower*6) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage over 6 sec and sometimes knocking down enemies."
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

            this.spellPower = 0.391
            if (caster.abilities["Master of the Elements"].talentSelect && checkBuff(caster,caster,"Master of the Elements")) {
                this.spellPower *= 1.2
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Master of the Elements") {
                        caster.buffs[i].duration = -1
                    }
                }
            }
            this.area.data.spellPower = this.spellPower

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)
            this.setCd()

            if (!caster.abilities["Aftershock"].refund()) {
                caster.useEnergy(this.cost)
            }

            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
