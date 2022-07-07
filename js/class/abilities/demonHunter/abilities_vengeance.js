class Vengeance_Abilities {
    "Disrupt" = new Disrupt()
    "Imprison" = new Imprison()
    "Consume Magic" = new ConsumeMagic()
    "Throw Glaive" = new ThrowGlaive()
    "Metamorphosis" = new Metamorphosis(true)
    "Torment" = new Torment()
    "Shear" = new Shear()
    "Soul Cleave" = new SoulCleave()
    "Immolation Aura" = new ImmolationAura(true)
    "Demon Spikes" = new DemonSpikes()

    //passive
    "Fel Blood" = new FelBlood()
    "MetaJump" = new MetaJump()
    "MetaStun" = new MetaStun()
    "Chaos Brand" = new ChaosBrand()
    "Demonic Wards" = new DemonicWards()
    "Soul Fragment" = new SoulFragment()
    "Consume Soul" = new ConsumeSoul()
    "Thick Skin" = new ThickSkin()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

class FelBlood extends Ability {
    constructor() {
        super("Fel Blood", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases the Armor bonus of Demon Spikes by an additional "+player.stats.mastery.toFixed(1)+"% of your Agility. Also increases your attack power by "+(player.stats.mastery/3).toFixed(1)+"%"
    }
}

class SoulFragment extends Ability {
    constructor() {
        super("Soul Fragment", 0, 0, 0, 0, false, false, false, "chaos", 40, 1)
        this.passive = true
        this.maxStacks = 5
        this.duration = 20
        this.damageLast5Sec = [0,0,0,0,0]
        this.timer1 = 0
        this.timer2 = 1
        this.idx = 0
    }

    run(caster) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            this.damageLast5Sec.shift()
            this.damageLast5Sec.push(0)
            this.idx++
            if (this.idx===5) {
                this.idx = 0
            }
        }
    }

    getTooltip() {
        return "Killing a target will sometimes shatter their soul, leaving a Soul Fragment behind for 20 sec.<br>" + //TODO:
            "<br>" +
            "Consuming a Lesser Soul Fragment heals you for 6% of all damage taken in the last 5 sec, minimum 1% of maximum health."
    }

    gainSoul(caster,stacks) {
        let buffStacks = 0
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Soul Fragment") {
                buffStacks += caster.buffs[i].stacks
                break
            }
        }
        if (buffStacks+stacks>5) {
            let s = (buffStacks+stacks)-5
            caster.abilities["Consume Soul"].consume(caster,s)
        }
        applyBuff(caster,caster,this,stacks,true)

    }
}


class ConsumeSoul extends Ability {
    constructor() {
        super("Consume Soul", 0, 0, 0, 0, false, false, false, "chaos", 40, 1)
        this.passive = true
        this.maxStacks = 5
        this.duration = 20
    }

    getTooltip() {
        return "Killing a target will sometimes shatter their soul, leaving a Soul Fragment behind for 20 sec.<br>" +
            "<br>" +
            "Consuming a Lesser Soul Fragment heals you for 6% of all damage taken in the last 5 sec, minimum 1% of maximum health."
    }

    consume(caster,stacks) {
        let val = 0
        for (let i = 0; i<caster.abilities["Soul Fragment"].damageLast5Sec.length; i++) {
            val += caster.abilities["Soul Fragment"].damageLast5Sec[i]
        }
        let buffStacks = 0
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Soul Fragment") {
                buffStacks += caster.buffs[i].stacks
                caster.buffs[i].stacks -= stacks
                if (caster.buffs[i].stacks<0) {
                    caster.buffs[i].duration = -1
                }
                break
            }
        }
        if (buffStacks<stacks) {
            stacks = buffStacks
        }
        let heal = (val*0.06) *stacks
        if (heal<(caster.maxHealth*0.01)*stacks) {
            heal = (caster.maxHealth*0.01)*stacks
        }
        doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,heal)
        return stacks
    }
}

class ThickSkin extends Ability {
    constructor() {
        super("Thick Skin", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.permanentBuff = true
        this.hiddenBuff = true
        this.duration = 10
        this.effect = [{name:"increaseStat",stat:"armor",val:100,percent:true},{name:"increaseStat",stat:"stamina",val:65,percent:true}]
    }

    getTooltip() {
        return "Fel energy thickens your skin to demonic proportions, increasing your Stamina by 65% and your Armor by 100%"
    }
}