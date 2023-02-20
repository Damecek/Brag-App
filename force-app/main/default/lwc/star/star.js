import {LightningElement, api} from 'lwc'

export default class Star extends LightningElement {
    @api star

    @api readOnly = false
    @api activeColor = '#ffd055'
    @api inactiveColor = '#d8d8d8'

    clickStar() {
        if (!this.readOnly) {
            const selected = new CustomEvent('selected', {detail: this.star.id})
            this.dispatchEvent(selected)
        }
    }

    get classes() {
        const classes = []
        classes.push('fa fa-star lwc-star')
        classes.push(this.isReadOnly())
        return classes.join(' ')
    }

    isReadOnly() {
        return this.readOnly ? '' : 'clickable'
    }

    get color() {
        return 'color:' + (this.star.isActive ? this.activeColor : this.inactiveColor) + ';'
    }
}
