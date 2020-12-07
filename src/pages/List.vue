<template>
  <h1 @click="log">List Page</h1>
  <div v-if="loading === true">Loading...</div>
  <div v-else-if="data.length === 0">No any game!</div>
  <div class="list" v-else>
    <a-table rowKey="id" :columns="columns" :data-source="data">
      <template #cover="{ record }">
        <img :src="record.coverImage" alt="" width="100" height="100" />
      </template>

      <template #name="{ record }">
        <router-link
          class="item-link"
          :key="record.id"
          :to="{ name: 'item', params: { id: record.id } }"
          >{{ record.name }}</router-link
        >
      </template>

      <template #players="{ record }">
        {{ record.minPlayers }} ~ {{ record.maxPlayers }}
      </template>
    </a-table>
  </div>
</template>

<script>
import getGames from "../apis/getGames";
import { Table } from "ant-design-vue";
import { GAME_TYPE } from "../constants";

const columns = [
  {
    title: "縮圖",
    dataIndex: "coverImage",
    slots: { customRender: "cover" },
    align: "center",
    width: "132px",
  },
  {
    title: "名稱",
    dataIndex: "name",
    slots: { customRender: "name" },
    align: "center",
  },
  {
    title: "遊玩人數",
    slots: { customRender: "players" },
    align: "center",
  },
  {
    title: "類別",
    dataIndex: "type",
    align: "center",
    filters: Object.keys(GAME_TYPE).map((typeKey) => ({
      text: GAME_TYPE[typeKey],
      value: typeKey,
    })),
    onFilter: (value, record) => record.type === value,
  },
];

export default {
  name: "List",
  components: {
    ATable: Table,
  },
  data() {
    return {
      loading: true,
      data: [],
      columns,
    };
  },
  async mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$data.loading = true;
      getGames().then((data) => {
        this.$data.data = data;
        this.$data.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.item-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}
</style>