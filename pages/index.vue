<template>
  <div class="style-layout">
    <template>
      <b-container class="header-title-pet">
        <img class="header-logo" src="../static/logo2.png" alt="#" />
        <span>Cổng tìm kiếm thông tin thú cưng</span>
        <SearchInput
          :search="search"
          :placeholder="'Nhập PetID bằng số để tìm kiếm'"
          :clearable="true"
          :size="'default'"
          :typeInput="true"
          :idElement="'id-search-pet'"
          class="search-pet"
          @onChangeHandler="onChangeHandler"
        />
      </b-container>
    </template>
    <template class="main">
      <b-container class="main-container-empty" v-if="isPetsEmpty">
        <div></div>
      </b-container>
      <b-container v-else class="main-container">
        <div class="header-id"></div>
        <div class="bachkground-row"></div>
        <div class="container-content">
          <b-row>
            <b-col cols="12" md="6" lg="6" class="content-left p-0"
              ><div class="content-size">
                <div class="cicle-border-yellow">
                  <div class="cicle-border">
                    <img class="cicle-img" :src="pets.avatar" alt="" />
                  </div>
                </div></div
            ></b-col>
            <b-col cols="12" md="6" lg="6">
              <div class="content-right">
                <div class="pet-layout">
                  <div class="pet-header">{{ pets.petName }}</div>
                  <div class="pet-desc-id">ID: {{ pets.id }}</div>
                </div>
                <div class="pet-layout">
                  <div class="pet-desc-mid">
                    {{
                      pets.petType === 0
                        ? "Không xác định"
                        : pets.petType === 1
                        ? "Chó"
                        : pets.petType === 2
                        ? "Mèo"
                        : "Thỏ"
                    }}
                    {{ pets.petBreed }} - {{ pets.petColor }}
                  </div>
                  <div class="pet-desc-mid">
                    Giới tính:
                    {{
                      pets.petSex === 0
                        ? "Không xác định"
                        : pets.petSex === 1
                        ? "Đực"
                        : "Cái"
                    }}
                    -
                    {{
                      pets.petTriet === 0
                        ? "Không xác định"
                        : pets.petTriet === 1
                        ? "Đã triệt sản"
                        : "Chưa"
                    }}
                  </div>
                  <div class="pet-desc-mid">
                    Ngày sinh: {{ pets.petDob | FormatDay }}
                  </div>
                </div>
                <div class="pet-layout">
                  <div class="pet-desc-bot">
                    Nơi đăng ký: {{ pets.site.name }}
                  </div>
                  <div class="pet-desc-bot">
                    Địa chỉ: {{ pets.site.address }}
                  </div>
                  <div class="pet-desc-bot">SĐT: {{ pets.site.phone }}</div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="bachkground-row"></div>
        <div class="footer-id"></div>
      </b-container>
    </template>
  </div>
</template>
<script>
// lib
import { mapGetters, mapActions } from "vuex";
import isEmpty from "lodash/isEmpty";
import _ from "lodash";
// component
import SearchInput from "@components/SearchInput";
export default {
  components: {
    SearchInput
  },
  data() {
    return {
      search: "",
      pagination: {
        keyword: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      loading: "pet/loading",
      pets: "pet/petSearch"
    }),
    isPetsEmpty() {
      return _.isEmpty(this.pets);
    },
    getQueryId() {
      return this.$route.query.id || "";
    }
  },
  methods: {
    ...mapActions({
      getPetSearchList: "pet/PET_SEARCH_GLOBAL"
    }),

    onChangeHandler(val) {
      if (val) {
        this.$router.push({ query: { id: val } });
      } else [this.$router.push({ query: "" })];
      this.pagination.keyword = val;
    },

    onSortNameHandler({ prop, order }) {
      const sort = {
        field: order ? prop : "",
        order: order?.replace("ing", "")
      };
      this.pagination = {
        ...this.pagination,
        ...sort
      };
    },
    autoFocusInput() {
      document.getElementById("id-search-pet").focus();
    }
  },

  mounted: async function() {
    this.autoFocusInput();
    if (this.getQueryId) {
      this.search = this.getQueryId;
      await this.getPetSearchList({ keyword: this.getQueryId });
    }
  },

  watch: {
    pagination: {
      handler(val) {
        this.getPetSearchList(_.pickBy(val, value => value));
      },
      deep: true
    }
  }

  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.getPetSearchList(_.pickBy(vm.pagination, value => value));
  //   });
  // }
};
</script>

<style lang="scss" scoped>
.style-layout {
  min-height: calc(100vh);
  background-color: #f9f9f9;
}
.container-detail {
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  padding: 20px !important;
  background-color: #fff;
  height: 100%;
}

.btn-delete {
  background-color: #f78989;
}

.btn-create {
  background-color: #b3c0d1;
}

.field-label-title {
  font-size: 24px;
}

.title-content-pet {
  width: 100%;
}

.main-container-empty {
  margin-top: 50px;
  text-align: center;
}

.main-container {
  margin-top: 30px;
  .bachkground-row {
    height: 8px;
    background-color: #68bde1;
  }
  .header-id {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #a02334;
    color: #e7aaaa;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    font-family: monospace;
    font-size: 34px;
    font-weight: 600;
  }
  .footer-id {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #a02334;
    color: #e7aaaa;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    font-family: monospace;
    font-size: 34px;
    font-weight: 600;
  }
  .container-content {
    background-color: #1f316f;
    .content-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .content-size {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .cicle-border-yellow {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 380px;
        height: 380px;
        background-color: #ffad60;
        border-radius: 50%;
        .cicle-border {
          flex-direction: column;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 370px;
          height: 370px;
          background-color: #68bde1;
          border-radius: 50%;
          .cicle-img {
            width: 360px;
            height: 360px;
            border-radius: 50%;
          }
        }
      }
    }
    .content-right {
      display: flex;
      padding: 0px 25px 25px 25px;
      flex-direction: column;
      gap: 35px;
      align-items: flex-start;
      .pet-layout {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
      .pet-header {
        font-family: "Coiny", cursive !important;
        font-size: 50px;
        color: #ffad60;
        font-weight: 700;
      }
      .pet-desc-id {
        color: #ffeead;
        font-size: 22px;
        font-weight: 600;
        font-family: "Coiny", cursive !important;
      }
      .pet-desc-mid {
        color: #ffeead;
        font-size: 22px;
        font-weight: 600;
        font-family: serif;
      }
      .pet-desc-bot {
        color: #ffeead;
        font-size: 22px;
        font-weight: 600;
        font-family: cursive;
      }
    }
  }
}

.field-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.field-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.field-label {
  font-weight: bold;
  margin-right: 10px;
}

.field-value {
  font-style: italic;
}

.search-pet {
  margin-top: 50px;
  width: 600px;
  height: 50px;
  ::v-deep .el-input__inner {
    height: 50px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    &:hover {
      border-color: #c0c4cc;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
  ::v-deep .el-input-group__append {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}

.btn-info {
  border: none;
  font-style: italic;
}

.el-aside {
  color: #333;
}

.header-title-pet {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header-logo {
    width: 300px;
  }
}

.header-title-pet span {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700 !important;
  font-size: 30px;
  line-height: 20px;
  color: #003049 !important;
  padding-left: 5px;
}
@media only screen and (max-width: 768px) {
  .search-pet {
    margin-top: 50px;
    width: 100%;
    height: 50px;
    ::v-deep .el-input__inner {
      height: 50px;
    }
  }
  .main-container {
    .container-content {
      .content-size {
        margin-top: 15px;
        .cicle-border-yellow {
          width: 330px;
          height: 330px;
          .cicle-border {
            width: 320px;
            height: 320px;
            .cicle-img {
              width: 310px;
              height: 310px;
              border-radius: 50%;
            }
          }
        }
      }
      .content-right {
        padding: 0px 25px 25px 25px;
        .pet-header {
          position: relative;
          left: 40px;
          width: 100px;
        }
      }
    }
  }
}
@media only screen and (max-width: 375px) {
  .main-container {
    .container-content {
      .content-size {
        margin-top: 15px;
        .cicle-border-yellow {
          width: 310px;
          height: 310px;
          .cicle-border {
            width: 300px;
            height: 300px;
            .cicle-img {
              width: 290px;
              height: 290px;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>
