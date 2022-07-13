let _discipline_talents = function(caster) {
    //1
    caster.abilities["Castigation"] = new Castigation()
    caster.abilities["Twist of Fate"] = new TwistofFate()
    caster.abilities["Schism"] = new Schism()

    //2
    caster.abilities["Body and Soul"] = new BodyandSoul()
    caster.abilities["Masochism"] = new Masochism()
    caster.abilities["Angelic Feather"] = new AngelicFeather()

    //3
    caster.abilities["Shield Discipline"] = new ShieldDiscipline()
    caster.abilities["Mindbender"] = new Mindbender()
    caster.abilities["Power Word: Solace"] = new PowerWordSolace()

    //4
    caster.abilities["Psychic Voice"] = new PsychicVoice()
    caster.abilities["Dominant Mind"] = new DominantMind()
    caster.abilities["Shining Force"] = new ShiningForce()

    //5
    caster.abilities["Sins of the Many"] = new SinsoftheMany()
    caster.abilities["Contrition"] = new Contrition()
    caster.abilities["Shadow Covenant"] = new ShadowCovenant()

    //6
    caster.abilities["Purge the Wicked"] = new PurgetheWicked()
    caster.abilities["Divine Star"] = new DivineStar()
    caster.abilities["Halo"] = new Halo()

    //7
    caster.abilities["Lenience"] = new Lenience()
    //caster.abilities["Spirit Shell"] = new SpiritShell()
    //caster.abilities["Evangelism"] = new Evangelism()


    caster.talents = [["Castigation","Twist of Fate","Schism"],
        ["Body and Soul","Masochism","Angelic Feather"],
        ["Shield Discipline","Mindbender","Power Word: Solace"],
        ["Psychic Voice","Dominant Mind","Shining Force"],
        ["Sins of the Many","Contrition","Shadow Covenant"],
        ["Purge the Wicked","Divine Star","Halo"],
        ["Lenience","Spirit Shell","Evangelism"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Castigation extends Ability {
    constructor() {
        super("Castigation", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Penance fires one additional bolt of holy light over its duration."
    }

}
//------------------------------------------------
class TwistofFate extends Ability {
    constructor() {
        super("Twist of Fate", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
        this.effect = [{name:"increaseStat",stat:"primary",val:20,percent:true}]
        this.duration = 10
    }

    getTooltip() {
        return "After healing a target below 35% health, you deal 20% increased damage and 20% increased healing for 10 sec."
    }

}
//------------------------------------------------
class Schism extends Ability {
    constructor() {
        super("Schism", 0.5, 1.5, 1.5, 24, false, true, false, "shadow", 40, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 9
        this.spellPower = 1.5
    }

    getTooltip() {
        return "Attack the enemy's soul with a surge of Shadow energy, dealing "+spellPowerToNumber(this.spellPower)+" Shadow damage and increasing your spell damage to the target by 25% for 9 sec."
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
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

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
                this.setCd()
                doDamage(caster,target,this)
                applyDebuff(caster,target,this)
                caster.useEnergy(this.cost,this.secCost)
            }
        }
    }

}
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
class Masochism extends Ability {
    constructor() {
        super("Masochism", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//When you cast Shadow Mend on yourself, its damage over time effect heals you instead, and reduces all damage you take by 10%."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
class ShieldDiscipline extends Ability {
    constructor() {
        super("Shield Discipline", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//When your Power Word: Shield is completely absorbed, you restore 0.5% of your maximum mana."
    }

}
//------------------------------------------------
class Mindbender extends Ability {
    constructor() {
        super("Mindbender", 0, 1.5, 0, 60, false, false, false, "shadow", 40, 1)
        this.talent = true
        this.petData = {
            name:"Mindbender",
            abilities:{},
            color:"#555256",
            size:6,
            do:[{name:"goMelee"}],
            autoAttackDamage:0.85
        }
        this.petDuration = 12
        this.duration = 12
        this.effect = [{name:"restoreMana",val:5}]
    }

    getTooltip() {
        return "Summons a Mindbender to attack the target for 12 sec. You regenerate 0.5% of maximum mana each time the Mindbender attacks."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    setTalent(caster) {
        caster.abilities["Shadowfiend"].canUse = false
        replaceAction(caster, "Shadowfiend", this.name)
    }

    unsetTalent(caster) {
        caster.abilities["Shadowfiend"].canUse = true
        replaceAction(caster,this.name,"Shadowfiend")
    }

}
//------------------------------------------------
class PowerWordSolace extends Ability {
    constructor() {
        super("Power Word: Solace", -1, 1.5, 0, 15, false, false, false, "holy", 40, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.8
    }

    getTooltip() {
        return "Strikes an enemy with heavenly power, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage and restoring 1% of your maximum mana."
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
            if (done && Object.keys(caster.castTarget).length !== 0) {
                if (this.isEnemy(caster,caster.castTarget)) {
                    if (this.checkDistance(caster,caster.castTarget) && !caster.castTarget.isDead) {
                        doDamage(caster, caster.castTarget, this)
                        caster.useEnergy(this.cost,this.secCost)
                        this.setCd()
                    }
                }
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


}
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
class DominantMind extends Ability {
    constructor() {
        super("Dominant Mind", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//You may also control your own character while Mind Control is active, but Mind Control has a 2 min cooldown, and it may not be used against players."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
class SinsoftheMany extends Ability {
    constructor() {
        super("Sins of the Many", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"increaseDamage",val:0.12}]
        this.duration = 10
        this.permanentBuff = true
    }

    getTooltip() {
        return "Your damage is increased by up to 12%, diminishing for each ally affected by your Atonement."
    }

    runBuff(caster, buff, id = 0) {
        let atonements = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (checkBuff(caster,friendlyTargets[i],"Atonement")) {
                atonements ++
            }
        }
        let val = 0.12
        if (atonements<2) {
            val = 0.12
        } else if (atonements<3) {
            val = 0.10
        } else if (atonements<4) {
            val = 0.8
        } else if (atonements<5) {
            val = 0.7
        } else if (atonements<7) {
            val = 0.6
        } else if (atonements<8) {
            val = 0.5
        } else if (atonements<10) {
            val = 0.4
        } else {
            val = 0.3
        }
        caster.buffs[id].effect[0].val = val
    }

    setTalent(caster) {
        applyBuff(caster,caster,this)
    }
    unsetTalent(caster) {
        checkBuff(caster,caster,this.name,true)
    }
}
//------------------------------------------------
class Contrition extends Ability {
    constructor() {
        super("Contrition", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.144
    }

    getTooltip() {
        return "When you heal with Penance, everyone with your Atonement is healed for "+spellPowerToNumber(this.spellPower)+"."
    }


}
//------------------------------------------------
class ShadowCovenant extends Ability {
    constructor() {
        super("Shadow Covenant", 4.5, 1.5, 0, 30, false, false, false, "shadow", 40, 1)
        this.talent = true
        this.spellPower = 1.65
        this.duration = 7
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Make a shadowy pact, healing the target and 4 other injured allies within 30 yds for (165% of Spell power). For 7 sec, your Shadow spells deal 25% increased damage and healing, but you cannot cast Holy spells."
    }


}
//------------------------------------------------------------------------------------------------ROW6
class PurgetheWicked extends Ability {
    constructor() {
        super("Purge the Wicked", 1.8, 1.5, 0, 0, false, false, false, "fire", 40, 1)
        this.talent = true
        this.spellPower = 0.223
        this.spellPowerDot = 1.24
        this.duration = 20
    }

    getTooltip() {
        return "Cleanses the target with fire, causing "+spellPowerToNumber(this.spellPower)+" Fire damage and an additional "+spellPowerHotToNumber(this.spellPowerDot)+" Fire damage over 20 sec. Spreads to an additional nearby enemy when you cast Penance on the target."
    }

    setTalent(caster) {
        caster.abilities["Shadow Word: Pain"].canUse = false
        replaceAction(caster, "Shadow Word: Pain", this.name)
    }

    unsetTalent(caster) {
        caster.abilities["Shadow Word: Pain"].canUse = true
        replaceAction(caster,this.name,"Shadow Word: Pain")
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
            if (done && Object.keys(caster.castTarget).length !== 0) {
                if (this.isEnemy(caster,caster.castTarget)) {
                    if (this.checkDistance(caster,caster.castTarget) && !caster.castTarget.isDead) {
                        doDamage(caster, caster.castTarget, this)
                        applyDot(caster,caster.castTarget,this,undefined,undefined,this.spellPowerDot)
                        caster.useEnergy(this.cost,this.secCost)
                        this.setCd()
                    }
                }
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
class Lenience extends Ability {
    constructor() {
        super("Lenience", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Atonement reduces damage taken by 3%."
    }

    setTalent(caster) {
        caster.abilities["Atonement"].effect = [{name:"damageReduction",val:0.03}]

    }

    unsetTalent(caster) {
        caster.abilities["Atonement"].effect = []
    }
}
//------------------------------------------------
//------------------------------------------------