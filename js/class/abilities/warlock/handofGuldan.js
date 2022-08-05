class HandofGuldan extends Ability {
    constructor() {
        let name = "Hand of Gul'dan"
        let cost = 1.5
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.176

        this.secCost = 1
        this.castPosition = {x:0,y:0}

        this.petData = {
            name:"Wild Imp",
            abilities:{"Fel Firebolt":new FelFirebolt()},
            color:"rgba(48,152,0,0.84)",
            size:4,
            do:[{name:"cast",ability:"Fel Firebolt"}],
            dontAutoAttack:true
        }
        this.petDuration = 16.1
    }

    getTooltip() {
        return "Calls down a demonic meteor full of Wild Imps which burst forth to attack the target.<br>" +
            "Deals up to "+spellPowerToNumber(this.spellPower*3)+" Shadowflame damage on impact to all enemies within 8 yds of the target" +
            "and summons up to 3 Wild Imps, based on Soul Shards consumed."

    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false

        let shards = caster.secondaryResource
        if (shards>3) {
            shards = 3
        }

        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(this.castPosition, enemies[i],10,true) ) {
                doDamage(caster, enemies[i], this,undefined,this.spellPower*shards)
            }
        }

        for (let i = 0; i<shards; i++) {
            this.petId = spawnPet(caster,"guardian",this.petData.name,this.castPosition.x-10+Math.random()*20,this.castPosition.y-10+Math.random()*20,this,true)
        }
        caster.useEnergy(this.cost,shards)
        this.setCd()
    }
}


//
class FelFirebolt extends Ability {
    constructor() {
        let name = "Fel Firebolt"
        let cost = 20
        let gcd = 3
        let castTime = 3
        let cd =0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.046

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:(this.castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster,target,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
