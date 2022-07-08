class Metamorphosis extends Ability {
    constructor(vengeance = false) {
        let name = "Metamorphosis"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 240
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "chaos"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.effect = [{name:"increaseStat",stat:"haste",val:25}]
        if (vengeance) {
            this.effect = [{name:"increaseHealth",val:0.5},{name:"increaseStat",stat:"armor",val:200,percent:true}]
            this.cd = 180
            this.maxCd = 180
            this.duration = 15
        }

        this.duration = 30
        this.castPosition = {x:0,y:0}
        this.spellPower = 0.36036
    }

    getTooltip() {
        if (player.spec==="havoc") {
            return "Leap into the air and land with explosive force, dealing "+spellPowerToNumber(this.spellPower)+" Chaos damage to enemies within 8 yds, and stunning them for 3 sec.<br>" +
                "<br>" +
                "Upon landing, you are transformed into a hellish demon for 30 sec, immediately resetting the cooldown of your Eye Beam and Blade Dance abilities, greatly empowering your Chaos Strike and Blade Dance abilities and gaining 25% Haste"
        }
        if (player.spec==="vengeance") {
            return "Transform to demon form for 15 sec, increasing current and maximum health by 50% and Armor by 200% <br>" +
                "While transformed, Shear and Fracture generate one additional Lesser Soul Fragment and 40 additional Fury" //TODO:Fracture

        }
    }

    getBuffTooltip(caster, target, buff) {
        if (caster.spec==="havoc") {
            return "Chaos Strike and Blade Dance upgraded to Annihilation and Death Sweep.<br>" +
                "Haste increased by 25%."
        } else {
            return "Maximum health increased by 50%.<br>" +
                "Armor increased by 200%.<br>" +
                "Shear generates 20 additional Fury and one additional Lesser Soul Fragment."
        }
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

            if (caster.spec==="havoc") {
                caster.abilities["MetaJump"].jump(this.castPosition.x,this.castPosition.y,caster)
                caster.abilities["Eye Beam"].cd = caster.abilities["Eye Beam"].maxCd
                caster.abilities["Blade Dance"].cd = caster.abilities["Blade Dance"].maxCd
                replaceAction(caster, "Blade Dance","Death Sweep")
                replaceAction(caster, "Chaos Strike","Annihilation")
            } else {
                caster.abilities["Shear"].cost -= 40
                caster.abilities["Shear"].fragments ++
            }


            applyBuff(caster,caster,this)

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    endBuff(caster) {
        if (caster.spec==="havoc") {
            caster.abilities["Death Sweep"].canUse = false
            caster.abilities["Annihilation"].canUse = false
            replaceAction(caster, "Death Sweep", "Blade Dance")
            replaceAction(caster, "Annihilation", "Chaos Strike")
        } else {
            caster.abilities["Shear"].cost += 40
            caster.abilities["Shear"].fragments --
        }
    }

}


//-----
class MetaJump extends Ability {
    constructor() {
        super("Metamorphosis  ", 0, 0, 0, 0, false, false, false, "chaos", 40, 1)
        this.passive = true
        this.hiddenBuff = true
        this.hiddenSB = true
        this.duration = 0.25
        this.effect = [{name:"moveToPoint",val:15,dist:0.5,target:{}}]
        this.spellPower = 0.36036
    }

    jump(x,y,caster) {
        caster.isRolling = true
        this.effect[0].target = {x:x+1,y:y+1}
        applyBuff(caster,caster,this)
    }

    endBuff(caster) {
        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],8,true) ) {
                doDamage(caster, enemies[i], this)
                applyDebuff(caster,enemies[i],caster.abilities["MetaStun"])
            }
        }
        caster.isRolling = false
    }
}

class MetaStun extends Ability {
    constructor() {
        super("MetaStun", 0, 0, 0, 0, false, false, false, "chaos", 8, 1)
        this.passive = true
        this.hiddenBuff = true
        this.hiddenSB = true
        this.duration = 3
        this.effect = [{name:"stun"}]
    }

}