class SummonDarkglare extends Ability {
    constructor() {
        let name = "Summon Darkglare"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1.2
        this.petData = {
            name:"Darkglare",
            abilities:{"Eye Beam ":new EyeBeamDarkglare()},
            color:"rgba(119,88,185,0.84)",
            size:8,
            do:[{name:"cast",ability:"Eye Beam "}],
            autoAttackDamage:0.45
        }
        this.petDuration = 20
        this.petId = false
        this.duration = 20
    }

    getTooltip() {
        return "Summons a Darkglare from the Twisting Nether that extends the duration of your damage over time effects on all enemies by 8 sec.<br>" +
            "<br>" +
            "The Darkglare will serve you for 20 sec, blasting its target for "+spellPowerToNumber(this.spellPower)+" Shadow damage, increased by 10% for every damage over time effect you have active on any target."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.pets[this.petId]!==undefined) {
                if (caster.pets[this.petId] && caster.pets[this.petId].name==="Darkglare") {
                    caster.pets[this.petId] = undefined
                }
            }

            this.petId = spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)

            for (let i = 0; i<enemies.length; i++) {
                for (let j = 0; j<enemies[i].debuffs.length; j++) {
                    if (enemies[i].debuffs[j].caster === caster) {
                        if (enemies[i].debuffs[j].name === "Agony" || enemies[i].debuffs[j].name === "Corruption" || enemies[i].debuffs[j].name === "Unstable Affliction" || enemies[i].debuffs[j].name === "Siphon Life" || enemies[i].debuffs[j].name === "Vile Taint" || enemies[i].debuffs[j].name === "Phantom Singularity") {
                            enemies[i].debuffs[j].duration += 8
                        }
                    }
                }
            }

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(caster, buff, id) {

    }

}

//
class EyeBeamDarkglare extends Ability {
    constructor() {
        let name = "Eye Beam "
        let cost = 0
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.32

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
                let dots = 0
                for (let j = 0; j<target.debuffs.length; j++) {
                    if (target.debuffs[j].caster === caster) {
                        if (target.debuffs[j].name === "Agony" || target.debuffs[j].name === "Corruption" || target.debuffs[j].name === "Unstable Affliction" || target.debuffs[j].name === "Siphon Life" || target.debuffs[j].name === "Vile Taint" || target.debuffs[j].name === "Phantom Singularity") {
                            dots ++
                        }
                    }
                }
                doDamage(caster,target,this,undefined,this.spellPower*(1+(dots/10)))
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
