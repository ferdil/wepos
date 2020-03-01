<template>
    <div class="wepos-qty-keypad-wrap" :class="className" v-hotkey="hotkeys">
        <v-popover offset="5" popover-base-class="qty-keypad tooltip popover" placement="top" :open="viewQtyKeypad">
            <a href="#" @click="showQtyKeypad">&nbsp;{{ name }}&nbsp;</a>
            <template slot="popover">
                <form>
                    <input type="text" v-model="displayValue" ref="qtyinput" @keyup="inputChange" @focus="disableKeyboard($event)">
                </form>
                <keyboard v-model="input" :layouts="layout()" @resetqty="resetQty" @qty="qty" @input="change"/>
            </template>
        </v-popover>
    </div>
</template>

<script>
import keyboard from './Keyboard.vue';

export default {

    name: 'QtyKeypad',

    components : {
        keyboard
    },
    computed: {
        hotkeys() {
            var keymap = {
				qty : {
                    'esc': this.hideQtyKeypad
				}
            }
            return keymap[this.shortKey];
        }
    },
    props: {
        name: {
            type: String,
            default: '1'
        },
        className: {
            type: String,
            default: ''
        },
        shortKey: {
            type: String,
            default: 'qty'
		},
		itemIndex: {
			type: Number,
			default: 0
		}
    },
    data () {
        return {
            input: '',
            displayValue: '',
			viewQtyKeypad: false,
        };
    },
    methods: {
        hideQtyKeypad(e) {
            this.viewQtyKeypad = false;
        },
        layout() {
            return '123|456|789|{<span class="keyboard-icon flaticon-backspace"></span>:backspace}0'+wepos.currency_format_decimal_sep+'|{C :clear}{ Ok :qty}';
		},
        qty( keyboard ) {
            this.$emit( 'setQuantity', keyboard.value.toString(), this.itemIndex);
            this.viewQtyKeypad = false;
            this.input='';
            this.displayValue='';
        },
        change(value){
            if ( !isNaN(value) ) {
                this.displayValue = value;
                this.input = this.displayValue;
            } else {
                this.input = this.displayValue;
                if ( this.displayValue == '' ) {
                    this.input = '';
                }
            }

            jQuery( this.$refs.qtyinput ).focus();

            if ( this.input == '' ) {
                jQuery( this.$refs.qtyinput ).focus();
            }
        },
        inputChange() {
            if ( !isNaN( this.displayValue ) ) {
                this.input = this.displayValue;
            } else {
                this.displayValue = this.input;
            }

            if ( this.input == '' ) {
                jQuery( this.$refs.qtyinput ).focus();
            }
        },
        disableKeyboard(el){
            el.preventDefault();
            el.target.blur();
        },
        showQtyKeypad(e) {
            e.preventDefault();
			this.viewQtyKeypad = true;
			this.displayValue = '';
			this.input = '';
            setTimeout( () => {
                jQuery( this.$refs.qtyinput ).focus();
            }, 500 );
        }
    }
};
</script>

<style lang="less">
.wepos-qty-keypad-wrap {
    display: inline-block;
}

.qty-keypad {
    .tooltip-inner {
        input {
            width: 87%;
            border: none;
            font-size: 20px;
            padding: 13px;
            height: 25px;
        }

        button[data-action="percent"],button[data-action="flat"] {
            cursor: pointer;
        }
    }
}

</style>