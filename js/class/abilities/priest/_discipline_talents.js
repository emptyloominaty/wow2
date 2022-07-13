let _discipline_talents = function(caster) {
    //1
    caster.abilities["Castigation"] = new Castigation()
    caster.abilities["Twist of Fate"] = new TwistofFate()
    caster.abilities["Schism"] = new Schism()

    //2
    caster.abilities["Body and Soul"] = new BodyandSoul()
    //caster.abilities["Masochism"] = new Masochism()
    caster.abilities["Angelic Feather"] = new AngelicFeather()

    //3
    //caster.abilities["Shield Discipline"] = new ShieldDiscipline()
    //caster.abilities["Mindbender"] = new Mindbender()
    //caster.abilities["Power Word: Solace"] = new PowerWordSolace()

    //4
    caster.abilities["Psychic Voice"] = new PsychicVoice()
    //caster.abilities["Dominant Mind"] = new DominantMind()
    caster.abilities["Shining Force"] = new ShiningForce()

    //5
    //caster.abilities["Sins of the Many"] = new SinsoftheMany()
    //caster.abilities["Contrition"] = new Contrition()
    //caster.abilities["Shadow Covenant"] = new ShadowCovenant()

    //6
    //caster.abilities["Purge the Wicked"] = new PurgetheWicked()
    caster.abilities["Divine Star"] = new DivineStar()
    caster.abilities["Halo"] = new Halo()

    //7
    //caster.abilities["Lenience"] = new Lenience()
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
        this.talentSelect = true
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
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------