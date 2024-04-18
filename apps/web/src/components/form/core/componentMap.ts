import { ComponentEnums } from './index'

import { ElInput, ElCascader, ElSwitch, ElCollapseItem } from 'element-plus'

import { CsDatePicker, CsRadioGroup, CsCheckboxGroup, CsTimePicker, CsSelect, CsInputNumber } from 'csui'

import FinanceDivider from '@/components/form-item/finance-divider.vue'
import FinanceOrgTree from '@/components/form-item/finance-org-tree.vue'
import FinanceCollapseItem from '@/components/form-item/finance-collapse-item.vue'
import FinanceUserSelect from '@/components/form-item/finance-user-select.vue'

import type { Component } from 'vue'

const componentsMap = new Map<ComponentEnums, Component>()

componentsMap.set('input', ElInput)
componentsMap.set('inputNumber', CsInputNumber)
componentsMap.set('select', CsSelect)
componentsMap.set('radio', CsRadioGroup)
componentsMap.set('switch', ElSwitch)
componentsMap.set('cascader', ElCascader)
componentsMap.set('checkbox', CsCheckboxGroup)
componentsMap.set('datePicker', CsDatePicker)

componentsMap.set('financeDivider', FinanceDivider)
componentsMap.set('timePicker', CsTimePicker)
componentsMap.set('financeOrgTree', FinanceOrgTree)
componentsMap.set('elCollapseItem', ElCollapseItem)
componentsMap.set('financeCollapseItem', FinanceCollapseItem)
componentsMap.set('financeUserSelect', FinanceUserSelect)

export default componentsMap
