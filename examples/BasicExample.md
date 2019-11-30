# BasicExample
> 👤 Clemlak
```
A basic contract
```


### 📋 Notice

A notice for the basic contract


### 🔎 Details

Some dev stuff for the basic contract

### 📡 Networks

The contract has been deployed to:
* **Network 1575142431303**: `0x37dd0087B5c9ea6921a248FF1f69e22b3b4E9E5E`



### 🎟 Events


#### NumberUpdated
| Name | Indexed | Type |
|:-:|:-:|:-:|
| sender | `true` | `address` |
| newValue | `false` | `uint256` |


#### RandomEvent
| Name | Indexed | Type |
|:-:|:-:|:-:|
| someValue | `false` | `uint256` |



## `isContractReady`

>👀 `view`




### → Returns



| Name | Type |
|:-:|:-:|
|  Not specified  | `bool` |



## `aRandomNumber`

>👀 `view`




### → Returns



| Name | Type |
|:-:|:-:|
|  Not specified  | `uint256` |



## `setNumber`

>👀 `payable` | 💰 Payable | 👤 ClemLak 

### 📋 Notice

Sets a number


### 🔎 Details

This is an external function

### ⚙️ Parameters

| Name | Type | Description |
|:-:|:-:| - |
| newNumber | `uint256` | The new value of the number |



## `setNumberIfContractIsReady`

>👀 `nonpayable`

### 📋 Notice

Sets a number if the contract is ready


### 🔎 Details

This is an external function

### ⚙️ Parameters

| Name | Type | Description |
|:-:|:-:| - |
| newNumber | `uint256` | The new value of the number |



## `getNumber`

>👀 `view`

### 📋 Notice

Gets the number


### 🔎 Details

This is an external view function

### → Returns

The value of the number

| Name | Type |
|:-:|:-:|
|  Not specified  | `uint256` |



## `getTwoNumbers`

>👀 `pure`

### 📋 Notice

Gets two numbers


### 🔎 Details

This function looks complex

### → Returns

A cool numberAnother cool number

| Name | Type |
|:-:|:-:|
|  Not specified  | `uint256` |
|  Not specified  | `uint256` |



## `add`

>👀 `pure`

### 📋 Notice

Add two numbers


### 🔎 Details

This function looks complex

### ⚙️ Parameters

| Name | Type | Description |
|:-:|:-:| - |
| b | `uint256` | Another number |

### → Returns

The sum of a + b

| Name | Type |
|:-:|:-:|
|  Not specified  | `uint256` |



