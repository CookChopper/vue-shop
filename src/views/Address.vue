<template>
  <div class="address-wrap">
    <simple-header title="收货地址" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
      :switchable="isSelected"
    />
  </div>
</template>

<script>
import { getAddress } from '../api/address'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      chosenAddressId: '', // 选择地址id
      list: [], // 地址列表
      disabledList: '',
      from: this.$route.query.from
    }
  },
  computed: {
    isSelected() {
      return this.from === 'mine' ? false : true
    }
  },
  created() {
    this.getAddress()
  },
  methods: {
    async getAddress() {
      const { data } = await getAddress()
      // 判断是否有默认地址
      let address = data.filter(item => item.defaultFlag)

      if (address.length) {
        // 有的话默认选上
        this.chosenAddressId = address[0].addressId
      }
      let _data = data.map(item => {
        return {
          id: item.addressId,
          name: item.userName,
          tel: item.userPhone,
          address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
          isDefault: item.defaultFlag === 0 ? false : true
        }
      })
      _data.sort((a, b) => {
        return b.isDefault - a.isDefault
      })
      this.list = _data
    },
    onAdd() {
      this.$router.push('/address/edit?type=add')
    },
    onEdit(address) {
      // console.log(address.id)
      this.$router.push(`/address/edit?type=edit&addressId=${address.id}`)
    },
    onSelect(address) {
      // console.log(address.id)
      if (address.id) {
        const cartItemIds = Cookies.get('cartItemIds')
        this.$router.push(`/create-order?cartItemIds=${cartItemIds}&addressId=${address.id}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.address-wrap {
  margin-top: 44px;
}
</style>
