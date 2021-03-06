const vm = new Vue({
  el: '#app',
  data: {
    editor: '',
  },
  watch: {
    editor() {
      return this.save(this.editor);
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    update: function update(e) {
      this.editor = e.target.value;
    },
    syncData: function syncData(changes, areaname) {
      self = this;
      if (areaname !== 'sync') return false;
      if (changes.stored && changes.stored.newValue) {
        console.log(changes.stored.newValue);
        self.editor = changes.stored.newValue;
      }

    },
    save: function save(input) {
      chrome.storage.sync.set({
        'stored': input
      }, () => true);
    },
    loadData: function loadData() {
      // Check if local storage is enabled
      self = this;
      chrome.storage.sync.get('stored', item => {
        const x = item.stored;
        self.editor = x;
      });
    },
    changeHandler() {
      return this.editor;
    }
  }
});




chrome.storage.onChanged.addListener(vm.syncData.bind());