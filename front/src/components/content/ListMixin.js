import { getList } from '@/api/content';
export default {
  methods: {    
    _getList () {
      if (this.isRepeat) {
        return;
      }
      if (this.isEnd) {
        return;
      }
      let postData = {
        catalog: this.catalog,
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      };
      this.isRepeat = true;
      getList(postData)
        .then((res) => {
          // 判断list是否为空，为空直接赋值，否则拼接
          if (res.code === 200) {
            // 判断res.data的长度，如果小于20条，则是最后一页
            if (res.data.length < this.limit) {
              this.isEnd = true;
            }
            if(this.list.length === 0) {
              this.list = res.data;
            } else {
              this.list = this.list.concat(res.data);
            }
          }
        })
        .catch((err) => {
          if (err) {
            this.$alert(err.msg || err.message);
          }
        })
        .finally(() => {
          this.isRepeat = false;
        });
    }
  }
};