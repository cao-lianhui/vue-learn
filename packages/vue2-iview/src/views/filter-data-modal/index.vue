<script>
import FilterModal from './components/index'

export default {
  name: 'Demo',
  components: {
    FilterModal,
  },
  data() {
    return {
      visible: true,
      // 纬度树数据
      dimensionData: [
        {
          title: 'parent 1-0',
          children: [
            {
              systemColumnType: 1,
              dataType: 1,
              title: 'leaf 1-0-1',
            },
            {
              systemColumnType: 1,
              dataType: 2,
              title: 'leaf 1-0-2',
            },
          ],
        },
        {
          title: 'parent 1-1',
          children: [
            {
              systemColumnType: 1,
              dataType: 3,
              title: 'leaf 1-1-1',
            },
            {
              systemColumnType: 1,
              dataType: 1,
              title: 'leaf 1-1-2',
            },
          ],
        },
        {
          title: 'parent 1-2',
          children: [
            {
              systemColumnType: 1,
              dataType: 1,
              title: 'leaf 1-2-1',
            },
            {
              systemColumnType: 1,
              dataType: 2,
              title: 'leaf 1-2-2',
            },
            {
              systemColumnType: 1,
              dataType: 3,
              title: 'leaf 1-2-3',
            },
          ],
        },
      ],
      // 度量树数据
      measureData: [
        {
          title: 'parent 1-0',
          children: [
            {
              systemColumnType: 2,
              dataType: 1,
              title: 'leaf 1-0-1',
            },
            {
              systemColumnType: 2,
              dataType: 2,
              title: 'leaf 1-0-2',
            },
          ],
        },
        {
          title: 'parent 1-1',
          children: [
            {
              systemColumnType: 2,
              dataType: 3,
              title: 'leaf 1-1-1',
            },
            {
              systemColumnType: 2,
              dataType: 2,
              title: 'leaf 1-2-2',
            },
            {
              systemColumnType: 3,
              dataType: 3,
              title: 'leaf 1-2-3',
            },
          ],
        },
      ],
      // 现有的过滤字段
      defaultSelectedNodes: [
        {
          systemColumnType: 1,
          dataType: 1,
          title: 'leaf 1-0-1',
          formData: ['1', '2'],
        },
        {
          systemColumnType: 1,
          dataType: 2,
          title: 'leaf 1-0-2',
          formData: ['2023-07-01', '2023-07-31'],
        },
        {
          systemColumnType: 1,
          dataType: 3,
          title: 'leaf 1-1-1',
          formData: {
            condition: 1,
            items: [
              { type: '1', value: '123' },
              { type: '2', value: '456' },
              { type: '3', value: '789' },
              { type: '4', value: '' },
              { type: '5', value: '' },
            ],
          },
        },
        {
          systemColumnType: 2,
          dataType: 1,
          title: 'leaf 1-0-1',
          formData: ['1', '2', '3', '4', '5', '6'],
        },
        {
          systemColumnType: 2,
          dataType: 2,
          title: 'leaf 1-0-2',
          formData: ['2023-07-22', '2023-07-31'],
        },
        {
          systemColumnType: 2,
          dataType: 3,
          title: 'leaf 1-1-1',
          formData: {
            condition: 1,
            items: [
              { type: '1', value: '123' },
              { type: '2', value: '456' },
              { type: '3', value: '789' },
              { type: '4', value: '' },
              { type: '5', value: '' },
              { type: '6', value: '111' },
              { type: '7', value: '222' },
              { type: '8', value: '333' },
            ],
          },
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <FilterModal
      :visible.sync="visible"
      :default-selected-nodes.sync="defaultSelectedNodes"
      :dimension-data="dimensionData"
      :measure-data="measureData"
    />
    <Button @click="visible = true">
      Open
    </Button>
  </div>
</template>
