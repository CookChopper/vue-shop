<template>
  <div class="address-edit-wrap">
    <simple-header :title="title" />
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :tel-maxlength="11"
      :tel-validator="telValidator"
      :address-info="addressInfo"
      @change-detail="changeDetail"
      ref="addressEdit"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { addAddress, getAddressDetail, editAddress, delAddress } from '../api/address'
import { Toast } from 'vant'
export default {
  data() {
    return {
      areaList,
      addressInfo: {},
      type: '',
      addressId: null
    }
  },
  mounted() {
    const { type, addressId } = this.$route.query
    this.type = type
    this.addressId = addressId
    this.init()
  },
  computed: {
    title() {
      return this.type === 'add' ? '添加地址' : '编辑地址'
    }
  },
  methods: {
    async init() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 判断是否有id
      if (this.addressId) {
        const { data } = await getAddressDetail(this.addressId)
        const areaCode = Object.keys(this.areaList.county_list).find(keys => {
          return this.areaList.county_list[keys] === data.regionName
        })
        this.addressInfo = {
          id: data.addressId,
          name: data.userName,
          tel: data.userPhone,
          isDefault: data.defaultFlag === 1 ? true : false,
          areaCode: areaCode,
          addressDetail: data.detailAddress
        }
      }

      Toast.clear()
    },
    async onSave(info) {
      const data = {
        cityName: info.city,
        defaultFlag: info.isDefault ? '1' : '0',
        detailAddress: info.addressDetail,
        provinceName: info.province,
        regionName: info.county,
        userName: info.name,
        userPhone: info.tel
      }
      // console.log(data)
      // console.log(info)
      try {
        if (this.type === 'add') {
          await addAddress(data)
        } else {
          await editAddress({ ...data, addressId: this.addressId })
        }
        Toast.success('添加成功')
        this.$router.push('/address')
      } catch (error) {
        console.log(error)
      }
    },
    async onDelete(address) {
      // console.log(arguments)
      if (address.id) {
        try {
          await delAddress(address.id)
          this.$router.push('/address')
        } catch (error) {
          console.log(error)
        }
      }
    },
    telValidator(tel) {
      return /^1[3-9]\d{9}$/.test(tel)
    },
    async changeDetail(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.address-edit-wrap {
  margin-top: 44px;
}
</style>
