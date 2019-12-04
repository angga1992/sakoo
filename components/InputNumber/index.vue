<template>
  <div
    :class="['numeric-input', controlsType==='updown'? 'updown' : '']" 
    class="border border-gray-400 rounded overflow-hidden"
    >
      <input
      style="height: 28px;"
      :name="name"
      ref="input"
      type="number"
      class="text-sm pr-1 w-full"
      :class="['numeric-input', this.controls ? '':'no-control']"
      :value="numericValue"
      :placeholder="placeholder"
      :max="max"
      :min="min"
      :style="{'textAlign': this.align}"
      @keypress="isInputNumber($event)"
      @input="inputHandler($event.target.value)"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      :autofocus="autofocus"
      :disabled="disabled"
      :readonly="readonly"
    >
      <button
        type="button"
        v-if="controls"
        class="btn btn-decrement"
        @mousedown="start(decrement)"
        @touchstart.native.prevent="start(decrement)"
        @touchend.native.prevent="stop"
        :disabled="disabled || numericValue <= min"
      >
        <i class="btn-icon"></i>
      </button>
      <button
        type="button"
        v-if="controls"
        class="btn btn-increment"
        @mousedown="start(increment)"
        @touchstart.native.prevent="start(increment)"
        @touchend.native.prevent="stop"
        :disabled="disabled || numericValue >= max"
      >
        <i class="btn-icon"></i>
      </button>
  </div>
</template>
<script>
const timeInterval = 100
export default {
  name: 'numeric-input',
  props: {
    name: String,
    value: Number,
    placeholder: String,
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    align: {
      type: String,
      default: 'center'
    },
    precision: {
      type: Number,
      validator (val) {
        return val >= 0 && Number.isInteger(val)
      }
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlsType: {
      type: String,
      default: 'plusminus',
      validator(val){
        return ['updown','plusminus'].indexOf(val) !==-1
      }
    }
  },
  data () {
    return {
      numericValue: null,
      interval: null,
      startTime: null,
      handler: Function
    }
  },
  watch: {
    // Watch for value change
    value: {
      immediate: true,
      // handle the changed value
      handler (val) {
        let newValue = val
        if (newValue) {
          newValue = this.toPrecision(newValue, this.precision)
          if (newValue >= this.max) {
            newValue = this.max
          }
          if (newValue <= this.min) {
            newValue = this.min
          }
          if (newValue !== val) {
            this.$emit('input', newValue)
          }
        }
        this.numericValue = newValue
      }
    }
  },
  methods: {
    isInputNumber(evt){      
      var ch = String.fromCharCode(evt.which);
      if(!(/[0-9]/.test(ch))){
        evt.preventDefault();
      } else {
        ch = Number(ch)
      }
    },
    toNumber (val) {
      let num = parseFloat(val)
      if (isNaN(val) || !isFinite(val)) {
        num = 0
      }
      return num
    },
    toPrecision (val, precision) {
      // return precision !== undefined ? parseFloat(val).toFixed(precision) : val
      // if (precision >= 0 ) {
      //   console.log('masuk kondisi precision',typeof(val),val)
      //   const a = parseFloat(val).toFixed(precision)
      //   console.log('setelah parsing float kondisi precision',typeof(a),a)
      //   return a
      // } else {
      //   console.log('tidak masuk kondisi precision',typeof(val),val)
      //   return val
      // }
        return val
    },
    increment () {
      if (!this.readonly) this.updateValue(this.toNumber(this.numericValue) + this.step)
    },
    decrement () {
      if (!this.readonly) this.updateValue(this.toNumber(this.numericValue) - this.step)
    },
    inputHandler (val) {
      this.updateValue(this.toNumber(val), val)
    },
    updateValue (val, strVal = null) {
      const oldVal = this.numericValue
      val = this.toPrecision(val, this.precision)
      if (val >= this.max) {
        val = this.max
      }
      if (val <= this.min) {
        val = this.min
      }
      if (val === oldVal) {
        this.$refs.input.value = strVal && val === this.toNumber(strVal) ? strVal : val
        return
      }
      this.numericValue = val
      this.$emit('input', val)
    },
    start (handler) {
      document.addEventListener('mouseup', this.stop)
      this.startTime = new Date()
      this.handler = handler
      clearInterval(this.interval)
      this.interval = setInterval(handler, timeInterval)
    },
    stop (evt) {
      document.removeEventListener(evt.type, this.stop)
      if (new Date() - this.startTime < timeInterval) {
        this.handler()
      }
      clearInterval(this.interval)
      this.interval = null
      this.handler = null
      this.startTime = null
      if (this.value !== this.numericValue) this.$emit('change', this.numericValue)
    },
    onBlur (event) {
      this.$emit('blur', event)
    },
    onFocus (event) {
      this.$emit('focus', event)
    },
    onChange (event) {
      this.$emit('change', this.numericValue)
    },
    focus () {
      if (!this.disabled) {
        this.$refs.input.focus()
      }
    },
    blur () {
      this.$refs.input.blur()
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.interval = null
    this.handler = null
    this.startTime = null
  }
}
</script>
<style scoped>
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {-moz-appearance: textfield;}
  button:focus {
    outline: none;
  }
  .numeric-input {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
  }
  .numeric-input .numeric-input {
    padding-right: 1.8rem;
    padding-left: 1.8rem;
    box-sizing: border-box;
    border-radius: 2px;
    display: block;
    line-height: 1.5rem;
    transition: all 0.1s ease 0s;
    width: 100%;
  }
  .numeric-input .btn {
    position: absolute;
    width: 1.5rem;
    margin: 0;
    cursor: pointer;
    text-align: center;
    transition: all 0.1s ease 0s;
  }
  .numeric-input .btn:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  .numeric-input .btn:active {
    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px inset, rgba(255, 255, 255, 0.222) -1px -1px 4px inset;
  }
  .numeric-input .btn:disabled {
     opacity: 0.4;
     box-shadow: none;
     cursor: not-allowed;
  }
  .numeric-input .numeric-input.no-control {
    padding: 2px 5px;
  }
  .numeric-input .btn-increment {
    right: 2px;
    top: 2px;
    bottom: 2px;
    border-radius: 4px;
    border-width: 1px;
  }
  .numeric-input .btn-increment .btn-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .numeric-input .btn-increment .btn-icon:before {
    position: absolute;
    visibility: visible;
    height: 0.09rem;
    width: 50%;
    background-color: #373636;
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .numeric-input .btn-increment .btn-icon:after {
    position: absolute;
    visibility: visible;
    height: 50%;
    width: 0.09rem;
    background-color: #373636;
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .numeric-input .btn-decrement {
    left: 2px;
    top: 2px;
    bottom: 2px;
    border-radius: 6px;
    border-width: 1px;
  }
  .numeric-input .btn-decrement .btn-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .numeric-input .btn-decrement .btn-icon:before {
    position:absolute;
    visibility: visible;
    height: 0.08rem;
    width: 50%;
    background-color: #111;
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .numeric-input .btn-decrement .btn-icon:after {
    visibility: hidden;
    content: "";
    clear: both;
    height: 0;
  }
  .numeric-input.updown .numeric-input {
    padding-right: 5px;
    padding-left: 5px;
  }
  .numeric-input.updown .btn-increment {
    right: -20px;
    top: 0;
    bottom: 50%;
    border-radius: 2px 2px 0 0;
    border-width: 1px 1px 0;
  }
  .numeric-input.updown .btn-increment .btn-icon {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-width: 0 0.45rem 0.45rem;
    border-color: transparent transparent #111;
    border-style: solid;
    margin: -0.25rem 0 0 -0.4rem;
  }
  .numeric-input.updown .btn-increment .btn-icon:before{
    visibility: hidden;
    display: block;
    content: "";
    clear: both;
    height: 0;
  }
  .numeric-input.updown .btn-increment .btn-icon:after {
    visibility: hidden;
    display: block;
    content: "";
    clear: both;
    height: 0;
   }
  .numeric-input.updown .btn-decrement {
    right: -20px;
    top: 50%;
    bottom: 0px;
    left: auto;
    border-radius: 0 0 2px 2px;
    border-width: 0 1px 1px;
  }
  .numeric-input.updown .btn-decrement .btn-icon {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-width: 0.45rem 0.45rem 0;
    border-color: #111 transparent transparent;
    border-style: solid;
    margin: -0.25rem 0 0 -0.4rem;
  }
</style>