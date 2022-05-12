class Ability {
    constructor(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges) {
        this.name = name
        this.cost = cost
        this.gcd = gcd
        this.castTime = castTime
        this.cd = cd
        this.maxCd = cd
        this.channeling = channeling
        this.casting = casting
        this.canMove = canMove
        this.school = school
        this.range = range
        this.charges = charges
        this.maxCharges = charges
    }
}