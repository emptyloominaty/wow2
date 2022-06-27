class Ww_abilities {
    "Tiger Palm" =  new TigerPalm(true)
    "Blackout Kick" =  new BlackoutKick(true)
    "Rising Sun Kick" =  new RisingSunKick(true)
    "Provoke" =  new Provoke()
    "Spinning Crane Kick" = new SpinningCraneKick(true)
    "Roll" = new Roll()
    "Spear Hand Strike" = new SpearHandStrike()
    "Touch of Death" = new TouchofDeath(true)
    "Leg Sweep" = new LegSweep()
    "Resuscitate" = new Resuscitate()
    "Transcendence" = new Transcendence(true)
    "Transcendence: Transfer" = new TranscendenceTransfer(true)
    "Paralysis" = new Paralysis(true)
    "Disable" = new Disable()
    "Fists of Fury" = new FistsofFury()
    "Touch of Karma" = new TouchofKarma()

    //passive
    "Mystic Touch" = new MysticTouch()
    "Windwalking" = new Windwalking()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

class Windwalking extends Ability {
    constructor() {
        super("Windwalking", 0, 0, 0, 0, false, false, false, "physical", 10, 1)
        this.passive = true
        this.duration = 10
        this.timer1 = 0
        this.timer2 = 1
        this.effect = [{name:"moveSpeed",val:0.1}]
    }

    run(caster) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            for (let i = 0; i<friendlyTargets.length ;i++) {
                let a = false
                if (!friendlyTargets[i].isDead && this.checkDistance(caster,friendlyTargets[i],10,true)) {
                    for (let j = 0; j<friendlyTargets[i].buffs.length; j++) {
                        if (friendlyTargets[i].buffs[j].name==="Windwalking" && friendlyTargets[i].buffs[j].caster!==caster) {
                            a = true
                        }
                    }
                    if (!a) {
                        applyBuff(caster,friendlyTargets[i],this)
                    }
                }
            }
        }
    }

    getTooltip() {
        return "You and your allies within 10 yards have 10% increased movement speed."
    }


}