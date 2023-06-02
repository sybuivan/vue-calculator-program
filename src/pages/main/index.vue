<template>
  <main>
    <h1 class="title">Calculator program VueJS</h1>
    <div class="box-input">
      <input
        type="number"
        class="box-calculation"
        :value="input"
        @change="handleOnChangeNumber"
        ref="myInput"
        :disabled="disableNumber"
        :class="{
          times: true,
          disabled: disableNumber,
        }"
      />
      <input
        type="text"
        class="box-result"
        :value="showInput.length > 0 ? showInput.join('') : 0"
        readonly
      />

      <div class="box-result">
        {{ result }}
      </div>
    </div>

    <div class="box-button">
      <button class="refresh" @click="handleRefresh">CE</button>
      <button class="del" @click="handleDelete">Del</button>
      <button class="operation plus" @click="handleOperator('+')">+</button>
      <button class="operation plus" @click="handleOperator('-')">-</button>
      <button
        :disabled="disable"
        class="operation"
        @click="handleOperator('*')"
        :class="{
          times: true,
          disabled: disable,
        }"
      >
        *
      </button>
      <button
        :disabled="disable"
        class="operation"
        @click="handleOperator('/')"
        :class="{
          divide: true,
          disabled: disable,
        }"
      >
        /
      </button>

      <KeyItem
        v-for="item in numberData"
        :key="item.value"
        :value="item.value"
        :onClick="handleClick"
        :selectedNumber="selectedNumber"
        :disableNumber="disableNumber"
      />

      <button
        class="dot"
        @click="handleDot"
        :style="disableNumber && 'cursor: no-drop'"
      >
        .
      </button>
      <button class="equal" @click="handleEqual">=</button>
    </div>
  </main>
</template>

<script>
import KeyItem from '../../components/key-item/index.vue';
import { calculateResult, checkError, checkOperator } from '../../utils/index';
import { numberData } from './data';
export default {
  components: {
    KeyItem,
  },
  data() {
    return {
      numberData,
      input: '',
      result: 0,
      showInput: [],
      operator: '',
      selectedNumber: null,
      disable: true,
      disableNumber: false,
    };
  },
  methods: {
    removeLastOperators() {
      while (checkOperator(this.showInput, this.showInput.length)) {
        this.showInput.pop();
      }
    },
    clearSelectedNumber() {
      this.selectedNumber = null;
    },
    handleClick(value) {
      this.input += value;
      this.selectedNumber = value;
      this.disable = false;
    },
    handleOnChangeNumber(event) {
      this.input += event.target.value;
      this.disable = false;
      this.selectedNumber = null;
    },
    handleOperator(operator) {
      if (this.input) this.showInput.push(this.input);
      switch (operator) {
        case '+': {
          this.removeLastOperators();
          this.showInput.push('+');
          break;
        }
        case '-': {
          this.removeLastOperators();
          this.showInput.push('-');
          break;
        }
        case '*': {
          this.removeLastOperators();
          this.showInput.push('*');
          break;
        }
        case '/': {
          this.removeLastOperators();
          this.showInput.push('/');
          break;
        }
        default:
          this.result = 0;
      }
      this.input = '';
      this.disableNumber = false;
      this.$refs.myInput.focus();
      this.clearSelectedNumber();
    },

    handleEqual() {
      if (this.input) {
        this.showInput.push(this.input);
      }

      this.input = '';
      this.selectedNumber = null;
      this.disable = false;
      this.disableNumber = true;
      this.removeLastOperators();
      const hasError = checkError(this.showInput);
      if (hasError) {
        return (this.result = 'Lỗi phép tính');
      }
      this.result = calculateResult(this.showInput);
      this.clearSelectedNumber();
    },
    handleRefresh() {
      this.input = '';
      this.result = '';
      this.showInput = [];
      this.disableNumber = false;
      this.clearSelectedNumber();
    },
    handleDot() {
      if (this.input.includes('.')) return alert('Lỗi số nhập vào');
      this.input += '.';
      this.clearSelectedNumber();
    },

    handleDelete() {
      this.clearSelectedNumber();
      this.disable = false;

      if (this.showInput.length > 0) {
        this.showInput.pop();
      }
      if (checkOperator(this.showInput, this.showInput.length)) {
        this.disableNumber = false;
      }
      if (this.input) return (this.input = this.input.slice(0, -1));
    },
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  font-size: 14px;
  color: #333;
}

.title {
  color: #5cb85c;
  text-align: center;
  padding: 10px 0;
}

.box-input,
.box-input input {
  width: 100%;
}

.calculator {
  width: 300px;
  height: auto;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 4px;
}
.box-calculation {
  background-color: #f7f8f9;
  border: 1px solid #666;
  padding: 10px 7px;
  font-size: 20px;
  margin-bottom: 2px;
}
.box-result {
  background-color: #f9f9f9;
  border: 1px solid #666;
  font-size: 20px;
  text-align: right;
  outline: none;
  min-height: 28px;
}
.box-button {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.box-button button {
  width: 32.4%;
  height: 40px;
  margin-top: 5px;
  font-size: 20px;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
button.number {
  background-color: #428bca;
}
button.number.active {
  background-color: #003b6f;
}
button.operation {
  background-color: #5cb85c;
}

button.operation.disabled {
  cursor: no-drop;
}

button.refresh {
  background-color: #d9534f;
}
button.del {
  background-color: #f0ad4e;
}
button.dot,
button.equal {
  background-color: #5bc0de;
}
</style>
