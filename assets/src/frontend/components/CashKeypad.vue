<template>
    <div class="wepos-modal-dialog wepos-cash-keypad-wrap cash-amount" :class="className" v-hotkey="hotkeys">
        <v-popover offset="1" popover-base-class="fee-keypad tooltip popover" placement="top" :open="viewCashKeypad">
            <input  href="#" v-model="displayValue" @click.prevent="showCashKeypad" :placeholder="prompt">
            <template slot="popover">
                <form>
                    <input type="text" v-model="displayValue" ref="cashinput" @keyup="inputChange">
                </form>
                <keyboard v-model="input" :layouts="layout()" @resetcash="resetcash" @cash="cash" @input="change"/>
            </template>
        </v-popover>
    </div>
</template>

<script>
import keyboard from './Keyboard.vue';

export default {

    name: 'CashKeypad',

    components : {
        keyboard
    },
    computed: {
        hotkeys() {
            var keymap = {
				cash : {
                    'esc': this.hideCashKeypad
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
            default: 'cash'
		},
		prompt: {
			type: String,
			default: ''
		}
    },
    data () {
        return {
            input: '',
            displayValue: '',
			viewCashKeypad: false,
        };
    },
    methods: {
        hideCashKeypad(e) {
            this.viewCashKeypad = false;
        },
        layout() {
            return '123|456|789|{<span class="keyboard-icon flaticon-backspace"></span>:backspace}0'+wepos.currency_format_decimal_sep+'|{ C :resetcash }{ Ok :cash}';
		},
		resetcash( keyboard) {
			this.displayValue = '1';
			this.input = this.displayValue;
		},
        cash( keyboard ) {
            this.$emit( 'setCashAmount', keyboard.value.toString());
            this.viewCashKeypad = false;
            this.input='';
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

            jQuery( this.$refs.cashinput ).focus();

            if ( this.input == '' ) {
                jQuery( this.$refs.cashinput ).focus();
            }
        },
        inputChange() {
            if ( !isNaN( this.displayValue ) ) {
                this.input = this.displayValue;
            } else {
                this.displayValue = this.input;
            }

            if ( this.input == '' ) {
                jQuery( this.$refs.cashinput ).focus();
            }
        },
        showCashKeypad(e) {
            e.preventDefault();
			this.viewCashKeypad = true;
			this.displayValue = '';
			this.input = '';
            setTimeout( () => {
				jQuery( this.$refs.cashinput ).focus();
					if (jQuery('.fee-keypad:visible').length) {
						jQuery('.fee-keypad').addClass('modal-open');
						jQuery('.fee-keypad').css("z-index",999999);
  					}
            }, 50 );
        }
    }
};
</script>

<style lang="less">
.wepos-cash-keypad-wrap {
	display: inline-block;
	z-index:999999;
}

.cash-keypad {
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