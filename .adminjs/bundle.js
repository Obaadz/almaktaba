(function (React, designSystem, adminjs) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespace(React);

    var BookStatus;
    (function (BookStatus) {
      BookStatus[BookStatus["New"] = 1] = "New";
      BookStatus[BookStatus["Used"] = 2] = "Used";
    })(BookStatus || (BookStatus = {}));
    var BookCategory;
    (function (BookCategory) {
      BookCategory[BookCategory["Drama"] = 1] = "Drama";
      BookCategory[BookCategory["Fantasy"] = 2] = "Fantasy";
      BookCategory[BookCategory["Action"] = 3] = "Action";
      BookCategory[BookCategory["Sci-fi"] = 4] = "Sci-fi";
      BookCategory[BookCategory["Romance"] = 5] = "Romance";
      BookCategory[BookCategory["War"] = 6] = "War";
      BookCategory[BookCategory["Psychology"] = 7] = "Psychology";
      BookCategory[BookCategory["Thriller"] = 8] = "Thriller";
      BookCategory[BookCategory["Dark fantasy"] = 9] = "Dark fantasy";
      BookCategory[BookCategory["Comedy"] = 10] = "Comedy";
    })(BookCategory || (BookCategory = {}));

    const bookStatusNumToString = status => {
      switch (status) {
        case BookStatus.New:
          return 'New';
        case BookStatus.Used:
          return 'Used';
        default:
          return 'Unknown';
      }
    };
    const BookCategoryNumToString = category => {
      switch (category) {
        case BookCategory.Drama:
          return 'Drama';
        case BookCategory.Fantasy:
          return 'Fantasy';
        case BookCategory.Action:
          return 'Action';
        case BookCategory['Sci-fi']:
          return 'Sci-fi';
        case BookCategory.Romance:
          return 'Romance';
        case BookCategory.War:
          return 'War';
        case BookCategory.Psychology:
          return 'Psychology';
        case BookCategory.Thriller:
          return 'Thriller';
        case BookCategory['Dark fantasy']:
          return 'Dark fantasy';
        case BookCategory.Comedy:
          return 'Comedy';
        default:
          return 'Unknown';
      }
    };
    function transformParams(params) {
      const result = {};
      for (const key in params) {
        const value = params[key];
        const keys = key.split('.');
        let current = result;
        for (let i = 0; i < keys.length - 1; i++) {
          const part = keys[i];
          if (!current[part]) current[part] = isNaN(parseInt(keys[i + 1])) ? {} : [];
          current = current[part];
        }
        const lastKey = keys[keys.length - 1];
        current[lastKey] = value;
      }
      return result;
    }
    const CartItemsPreview = props => {
      const params = transformParams(props.record.params);
      console.log(params);
      return /*#__PURE__*/React__namespace.createElement("div", {
        style: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: '12px',
          lineHeight: '16px',
          color: 'rgb(137, 138, 154)',
          marginBottom: '4px',
          fontWeight: '300'
        }
      }, /*#__PURE__*/React__namespace.createElement(designSystem.Label, null, "Books"), /*#__PURE__*/React__namespace.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      }, params.cartItems.map(item => ( /*#__PURE__*/React__namespace.createElement(designSystem.Box, {
        key: item.id,
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          marginBottom: '0.5rem'
        }
      }, /*#__PURE__*/React__namespace.createElement("img", {
        src: item.book.url,
        alt: item.book.title,
        style: {
          width: '50px',
          height: '50px',
          borderRadius: '0.25rem'
        }
      }), /*#__PURE__*/React__namespace.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          color: 'unset'
        }
      }, /*#__PURE__*/React__namespace.createElement("h4", null, "title: ", item.book.title), /*#__PURE__*/React__namespace.createElement("p", null, "Price: ", item.bookPrice), /*#__PURE__*/React__namespace.createElement("p", null, "Quantity: ", item.quantity), /*#__PURE__*/React__namespace.createElement("p", null, "Status: ", bookStatusNumToString(item.book.status)), /*#__PURE__*/React__namespace.createElement("p", null, "Category: ", BookCategoryNumToString(item.book.category))))))));
    };

    const PasswordEdit = props => {
      const {
        onChange,
        property,
        record,
        resource
      } = props;
      const {
        translateButton: tb
      } = adminjs.useTranslation();
      const [showPassword, togglePassword] = React.useState(false);
      React.useEffect(() => {
        if (!showPassword) {
          onChange(property.name, '');
        }
      }, [onChange, showPassword]);
      // For new records always show the property
      if (!record.id) {
        return /*#__PURE__*/React__namespace.default.createElement(adminjs.BasePropertyComponent.Password.Edit, props);
      }
      return /*#__PURE__*/React__namespace.default.createElement(designSystem.Box, null, showPassword && /*#__PURE__*/React__namespace.default.createElement(adminjs.BasePropertyComponent.Password.Edit, props), /*#__PURE__*/React__namespace.default.createElement(designSystem.Box, {
        mb: "xl"
      }, /*#__PURE__*/React__namespace.default.createElement(designSystem.Text, {
        textAlign: "center"
      }, /*#__PURE__*/React__namespace.default.createElement(designSystem.Button, {
        onClick: () => togglePassword(!showPassword),
        type: "button"
      }, showPassword ? tb('cancel', resource.id) : tb('changePassword', resource.id)))));
    };

    const Edit = ({ property, record, onChange }) => {
        const { translateProperty } = adminjs.useTranslation();
        const { params } = record;
        const { custom } = property;
        const path = adminjs.flat.get(params, custom.filePathProperty);
        const key = adminjs.flat.get(params, custom.keyProperty);
        const file = adminjs.flat.get(params, custom.fileProperty);
        const [originalKey, setOriginalKey] = React.useState(key);
        const [filesToUpload, setFilesToUpload] = React.useState([]);
        React.useEffect(() => {
            // it means means that someone hit save and new file has been uploaded
            // in this case fliesToUpload should be cleared.
            // This happens when user turns off redirect after new/edit
            if ((typeof key === 'string' && key !== originalKey)
                || (typeof key !== 'string' && !originalKey)
                || (typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length)) {
                setOriginalKey(key);
                setFilesToUpload([]);
            }
        }, [key, originalKey]);
        const onUpload = (files) => {
            setFilesToUpload(files);
            onChange(custom.fileProperty, files);
        };
        const handleRemove = () => {
            onChange(custom.fileProperty, null);
        };
        const handleMultiRemove = (singleKey) => {
            const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
            const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
            if (path && path.length > 0) {
                const newPath = path.map((currentPath, i) => (i !== index ? currentPath : null));
                let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
                newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
                onChange({
                    ...record,
                    params: newParams,
                });
            }
            else {
                // eslint-disable-next-line no-console
                console.log('You cannot remove file when there are no uploaded files yet');
            }
        };
        return (React__namespace.default.createElement(designSystem.FormGroup, null,
            React__namespace.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
            React__namespace.default.createElement(designSystem.DropZone, { onChange: onUpload, multiple: custom.multiple, validate: {
                    mimeTypes: custom.mimeTypes,
                    maxSize: custom.maxSize,
                }, files: filesToUpload }),
            !custom.multiple && key && path && !filesToUpload.length && file !== null && (React__namespace.default.createElement(designSystem.DropZoneItem, { filename: key, src: path, onRemove: handleRemove })),
            custom.multiple && key && key.length && path ? (React__namespace.default.createElement(React__namespace.default.Fragment, null, key.map((singleKey, index) => {
                // when we remove items we set only path index to nulls.
                // key is still there. This is because
                // we have to maintain all the indexes. So here we simply filter out elements which
                // were removed and display only what was left
                const currentPath = path[index];
                return currentPath ? (React__namespace.default.createElement(designSystem.DropZoneItem, { key: singleKey, filename: singleKey, src: path[index], onRemove: () => handleMultiRemove(singleKey) })) : '';
            }))) : ''));
    };

    const AudioMimeTypes = [
        'audio/aac',
        'audio/midi',
        'audio/x-midi',
        'audio/mpeg',
        'audio/ogg',
        'application/ogg',
        'audio/opus',
        'audio/wav',
        'audio/webm',
        'audio/3gpp2',
    ];
    const ImageMimeTypes = [
        'image/bmp',
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'image/vnd.microsoft.icon',
        'image/tiff',
        'image/webp',
    ];

    // eslint-disable-next-line import/no-extraneous-dependencies
    const SingleFile = (props) => {
        const { name, path, mimeType, width } = props;
        if (path && path.length) {
            if (mimeType && ImageMimeTypes.includes(mimeType)) {
                return (React__namespace.default.createElement("img", { src: path, style: { maxHeight: width, maxWidth: width }, alt: name }));
            }
            if (mimeType && AudioMimeTypes.includes(mimeType)) {
                return (React__namespace.default.createElement("audio", { controls: true, src: path },
                    "Your browser does not support the",
                    React__namespace.default.createElement("code", null, "audio"),
                    React__namespace.default.createElement("track", { kind: "captions" })));
            }
        }
        return (React__namespace.default.createElement(designSystem.Box, null,
            React__namespace.default.createElement(designSystem.Button, { as: "a", href: path, ml: "default", size: "sm", rounded: true, target: "_blank" },
                React__namespace.default.createElement(designSystem.Icon, { icon: "DocumentDownload", color: "white", mr: "default" }),
                name)));
    };
    const File = ({ width, record, property }) => {
        const { custom } = property;
        let path = adminjs.flat.get(record?.params, custom.filePathProperty);
        if (!path) {
            return null;
        }
        const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
        const mimeType = custom.mimeTypeProperty
            && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
        if (!property.custom.multiple) {
            if (custom.opts && custom.opts.baseUrl) {
                path = `${custom.opts.baseUrl}/${name}`;
            }
            return (React__namespace.default.createElement(SingleFile, { path: path, name: name, width: width, mimeType: mimeType }));
        }
        if (custom.opts && custom.opts.baseUrl) {
            const baseUrl = custom.opts.baseUrl || '';
            path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
        }
        return (React__namespace.default.createElement(React__namespace.default.Fragment, null, path.map((singlePath, index) => (React__namespace.default.createElement(SingleFile, { key: singlePath, path: singlePath, name: name[index], width: width, mimeType: mimeType[index] })))));
    };

    const List = (props) => (React__namespace.default.createElement(File, { width: 100, ...props }));

    const Show = (props) => {
        const { property } = props;
        const { translateProperty } = adminjs.useTranslation();
        return (React__namespace.default.createElement(designSystem.FormGroup, null,
            React__namespace.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
            React__namespace.default.createElement(File, { width: "100%", ...props })));
    };

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.CartItemsPreview = CartItemsPreview;
    AdminJS.UserComponents.PasswordEditComponent = PasswordEdit;
    AdminJS.UserComponents.UploadEditComponent = Edit;
    AdminJS.UserComponents.UploadListComponent = List;
    AdminJS.UserComponents.UploadShowComponent = Show;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L3V0aWxzL2VudW1zLmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL2NhcnQtaXRlbXMtcHJldmlldy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy9wYXNzd29yZHMvYnVpbGQvY29tcG9uZW50cy9QYXNzd29yZEVkaXRDb21wb25lbnQuanN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZEVkaXRDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL3R5cGVzL21pbWUtdHlwZXMudHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkU2hvd0NvbXBvbmVudC5qcyIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgQm9va1N0YXR1cztcbihmdW5jdGlvbiAoQm9va1N0YXR1cykge1xuICAgIEJvb2tTdGF0dXNbQm9va1N0YXR1c1tcIk5ld1wiXSA9IDFdID0gXCJOZXdcIjtcbiAgICBCb29rU3RhdHVzW0Jvb2tTdGF0dXNbXCJVc2VkXCJdID0gMl0gPSBcIlVzZWRcIjtcbn0pKEJvb2tTdGF0dXMgfHwgKEJvb2tTdGF0dXMgPSB7fSkpO1xuZXhwb3J0IHZhciBCb29rQ2F0ZWdvcnk7XG4oZnVuY3Rpb24gKEJvb2tDYXRlZ29yeSkge1xuICAgIEJvb2tDYXRlZ29yeVtCb29rQ2F0ZWdvcnlbXCJEcmFtYVwiXSA9IDFdID0gXCJEcmFtYVwiO1xuICAgIEJvb2tDYXRlZ29yeVtCb29rQ2F0ZWdvcnlbXCJGYW50YXN5XCJdID0gMl0gPSBcIkZhbnRhc3lcIjtcbiAgICBCb29rQ2F0ZWdvcnlbQm9va0NhdGVnb3J5W1wiQWN0aW9uXCJdID0gM10gPSBcIkFjdGlvblwiO1xuICAgIEJvb2tDYXRlZ29yeVtCb29rQ2F0ZWdvcnlbXCJTY2ktZmlcIl0gPSA0XSA9IFwiU2NpLWZpXCI7XG4gICAgQm9va0NhdGVnb3J5W0Jvb2tDYXRlZ29yeVtcIlJvbWFuY2VcIl0gPSA1XSA9IFwiUm9tYW5jZVwiO1xuICAgIEJvb2tDYXRlZ29yeVtCb29rQ2F0ZWdvcnlbXCJXYXJcIl0gPSA2XSA9IFwiV2FyXCI7XG4gICAgQm9va0NhdGVnb3J5W0Jvb2tDYXRlZ29yeVtcIlBzeWNob2xvZ3lcIl0gPSA3XSA9IFwiUHN5Y2hvbG9neVwiO1xuICAgIEJvb2tDYXRlZ29yeVtCb29rQ2F0ZWdvcnlbXCJUaHJpbGxlclwiXSA9IDhdID0gXCJUaHJpbGxlclwiO1xuICAgIEJvb2tDYXRlZ29yeVtCb29rQ2F0ZWdvcnlbXCJEYXJrIGZhbnRhc3lcIl0gPSA5XSA9IFwiRGFyayBmYW50YXN5XCI7XG4gICAgQm9va0NhdGVnb3J5W0Jvb2tDYXRlZ29yeVtcIkNvbWVkeVwiXSA9IDEwXSA9IFwiQ29tZWR5XCI7XG59KShCb29rQ2F0ZWdvcnkgfHwgKEJvb2tDYXRlZ29yeSA9IHt9KSk7XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMYWJlbCwgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBCb29rU3RhdHVzLCBCb29rQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi91dGlscy9lbnVtcy5qcyc7XG5jb25zdCBib29rU3RhdHVzTnVtVG9TdHJpbmcgPSAoc3RhdHVzKSA9PiB7XG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgY2FzZSBCb29rU3RhdHVzLk5ldzpcbiAgICAgICAgICAgIHJldHVybiAnTmV3JztcbiAgICAgICAgY2FzZSBCb29rU3RhdHVzLlVzZWQ6XG4gICAgICAgICAgICByZXR1cm4gJ1VzZWQnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICdVbmtub3duJztcbiAgICB9XG59O1xuY29uc3QgQm9va0NhdGVnb3J5TnVtVG9TdHJpbmcgPSAoY2F0ZWdvcnkpID0+IHtcbiAgICBzd2l0Y2ggKGNhdGVnb3J5KSB7XG4gICAgICAgIGNhc2UgQm9va0NhdGVnb3J5LkRyYW1hOlxuICAgICAgICAgICAgcmV0dXJuICdEcmFtYSc7XG4gICAgICAgIGNhc2UgQm9va0NhdGVnb3J5LkZhbnRhc3k6XG4gICAgICAgICAgICByZXR1cm4gJ0ZhbnRhc3knO1xuICAgICAgICBjYXNlIEJvb2tDYXRlZ29yeS5BY3Rpb246XG4gICAgICAgICAgICByZXR1cm4gJ0FjdGlvbic7XG4gICAgICAgIGNhc2UgQm9va0NhdGVnb3J5WydTY2ktZmknXTpcbiAgICAgICAgICAgIHJldHVybiAnU2NpLWZpJztcbiAgICAgICAgY2FzZSBCb29rQ2F0ZWdvcnkuUm9tYW5jZTpcbiAgICAgICAgICAgIHJldHVybiAnUm9tYW5jZSc7XG4gICAgICAgIGNhc2UgQm9va0NhdGVnb3J5LldhcjpcbiAgICAgICAgICAgIHJldHVybiAnV2FyJztcbiAgICAgICAgY2FzZSBCb29rQ2F0ZWdvcnkuUHN5Y2hvbG9neTpcbiAgICAgICAgICAgIHJldHVybiAnUHN5Y2hvbG9neSc7XG4gICAgICAgIGNhc2UgQm9va0NhdGVnb3J5LlRocmlsbGVyOlxuICAgICAgICAgICAgcmV0dXJuICdUaHJpbGxlcic7XG4gICAgICAgIGNhc2UgQm9va0NhdGVnb3J5WydEYXJrIGZhbnRhc3knXTpcbiAgICAgICAgICAgIHJldHVybiAnRGFyayBmYW50YXN5JztcbiAgICAgICAgY2FzZSBCb29rQ2F0ZWdvcnkuQ29tZWR5OlxuICAgICAgICAgICAgcmV0dXJuICdDb21lZHknO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICdVbmtub3duJztcbiAgICB9XG59O1xuZnVuY3Rpb24gdHJhbnNmb3JtUGFyYW1zKHBhcmFtcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcmFtc1trZXldO1xuICAgICAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGxldCBjdXJyZW50ID0gcmVzdWx0O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIGlmICghY3VycmVudFtwYXJ0XSlcbiAgICAgICAgICAgICAgICBjdXJyZW50W3BhcnRdID0gaXNOYU4ocGFyc2VJbnQoa2V5c1tpICsgMV0pKSA/IHt9IDogW107XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwYXJ0XTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0S2V5ID0ga2V5c1trZXlzLmxlbmd0aCAtIDFdO1xuICAgICAgICBjdXJyZW50W2xhc3RLZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5jb25zdCBDYXJ0SXRlbXNQcmV2aWV3ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0gdHJhbnNmb3JtUGFyYW1zKHByb3BzLnJlY29yZC5wYXJhbXMpO1xuICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdSb2JvdG8sIHNhbnMtc2VyaWYnLFxuICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxNnB4JyxcbiAgICAgICAgICAgIGNvbG9yOiAncmdiKDEzNywgMTM4LCAxNTQpJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzRweCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnMzAwJyxcbiAgICAgICAgfSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCBcIkJvb2tzXCIpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICB9IH0sIHBhcmFtcy5jYXJ0SXRlbXMubWFwKChpdGVtKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsga2V5OiBpdGVtLmlkLCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICBnYXA6ICcwLjI1cmVtJyxcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcwLjVyZW0nLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IHNyYzogaXRlbS5ib29rLnVybCwgYWx0OiBpdGVtLmJvb2sudGl0bGUsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcwLjI1cmVtJyxcbiAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAndW5zZXQnLFxuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDRcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZTogXCIsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYm9vay50aXRsZSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgXCJQcmljZTogXCIsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYm9va1ByaWNlKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBcIlF1YW50aXR5OiBcIixcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5xdWFudGl0eSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgXCJTdGF0dXM6IFwiLFxuICAgICAgICAgICAgICAgICAgICBib29rU3RhdHVzTnVtVG9TdHJpbmcoaXRlbS5ib29rLnN0YXR1cykpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnk6IFwiLFxuICAgICAgICAgICAgICAgICAgICBCb29rQ2F0ZWdvcnlOdW1Ub1N0cmluZyhpdGVtLmJvb2suY2F0ZWdvcnkpKSkpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgQ2FydEl0ZW1zUHJldmlldztcbiIsImltcG9ydCB7IEJveCwgQnV0dG9uLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBCYXNlUHJvcGVydHlDb21wb25lbnQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IFBhc3N3b3JkRWRpdCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHByb3BlcnR5LCByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHRyYW5zbGF0ZUJ1dHRvbjogdGIgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgY29uc3QgW3Nob3dQYXNzd29yZCwgdG9nZ2xlUGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICghc2hvd1Bhc3N3b3JkKSB7XG4gICAgICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCAnJyk7XG4gICAgICAgIH1cbiAgICB9LCBbb25DaGFuZ2UsIHNob3dQYXNzd29yZF0pO1xuICAgIC8vIEZvciBuZXcgcmVjb3JkcyBhbHdheXMgc2hvdyB0aGUgcHJvcGVydHlcbiAgICBpZiAoIXJlY29yZC5pZCkge1xuICAgICAgICByZXR1cm4gPEJhc2VQcm9wZXJ0eUNvbXBvbmVudC5QYXNzd29yZC5FZGl0IHsuLi5wcm9wc30vPjtcbiAgICB9XG4gICAgcmV0dXJuICg8Qm94PlxuICAgICAge3Nob3dQYXNzd29yZCAmJiA8QmFzZVByb3BlcnR5Q29tcG9uZW50LlBhc3N3b3JkLkVkaXQgey4uLnByb3BzfS8+fVxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxUZXh0IHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gdG9nZ2xlUGFzc3dvcmQoIXNob3dQYXNzd29yZCl9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgIHtzaG93UGFzc3dvcmQgPyB0YignY2FuY2VsJywgcmVzb3VyY2UuaWQpIDogdGIoJ2NoYW5nZVBhc3N3b3JkJywgcmVzb3VyY2UuaWQpfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IFBhc3N3b3JkRWRpdDtcbiIsImltcG9ydCB7IERyb3Bab25lLCBEcm9wWm9uZUl0ZW0sIEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IEVkaXQgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XG4gICAgY29uc3QgeyB0cmFuc2xhdGVQcm9wZXJ0eSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBjb25zdCBwYXRoID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgY29uc3Qga2V5ID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IGZpbGUgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUHJvcGVydHkpO1xuICAgIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KTtcbiAgICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZShbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgICAgICAvLyBpbiB0aGlzIGNhc2UgZmxpZXNUb1VwbG9hZCBzaG91bGQgYmUgY2xlYXJlZC5cbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICAgICAgaWYgKCh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkgIT09IG9yaWdpbmFsS2V5KVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmICFvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiBBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCAhPT0gb3JpZ2luYWxLZXkubGVuZ3RoKSkge1xuICAgICAgICAgICAgc2V0T3JpZ2luYWxLZXkoa2V5KTtcbiAgICAgICAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pO1xuICAgICAgICB9XG4gICAgfSwgW2tleSwgb3JpZ2luYWxLZXldKTtcbiAgICBjb25zdCBvblVwbG9hZCA9IChmaWxlcykgPT4ge1xuICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKGZpbGVzKTtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IChmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpIHx8IFtdKS5pbmRleE9mKHNpbmdsZUtleSk7XG4gICAgICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXTtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKTtcbiAgICAgICAgICAgIGxldCBuZXdQYXJhbXMgPSBmbGF0LnNldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LCBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdKTtcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZsYXQuc2V0KG5ld1BhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHksIG5ld1BhdGgpO1xuICAgICAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG5ld1BhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCB0cmFuc2xhdGVQcm9wZXJ0eShwcm9wZXJ0eS5sYWJlbCwgcHJvcGVydHkucmVzb3VyY2VJZCkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lLCB7IG9uQ2hhbmdlOiBvblVwbG9hZCwgbXVsdGlwbGU6IGN1c3RvbS5tdWx0aXBsZSwgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgbWF4U2l6ZTogY3VzdG9tLm1heFNpemUsXG4gICAgICAgICAgICB9LCBmaWxlczogZmlsZXNUb1VwbG9hZCB9KSxcbiAgICAgICAgIWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsgZmlsZW5hbWU6IGtleSwgc3JjOiBwYXRoLCBvblJlbW92ZTogaGFuZGxlUmVtb3ZlIH0pKSxcbiAgICAgICAgY3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwga2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lSXRlbSwgeyBrZXk6IHNpbmdsZUtleSwgZmlsZW5hbWU6IHNpbmdsZUtleSwgc3JjOiBwYXRoW2luZGV4XSwgb25SZW1vdmU6ICgpID0+IGhhbmRsZU11bHRpUmVtb3ZlKHNpbmdsZUtleSkgfSkpIDogJyc7XG4gICAgICAgIH0pKSkgOiAnJykpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEVkaXQ7XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICAgJ2F1ZGlvL2FhYycsXG4gICAgJ2F1ZGlvL21pZGknLFxuICAgICdhdWRpby94LW1pZGknLFxuICAgICdhdWRpby9tcGVnJyxcbiAgICAnYXVkaW8vb2dnJyxcbiAgICAnYXBwbGljYXRpb24vb2dnJyxcbiAgICAnYXVkaW8vb3B1cycsXG4gICAgJ2F1ZGlvL3dhdicsXG4gICAgJ2F1ZGlvL3dlYm0nLFxuICAgICdhdWRpby8zZ3BwMicsXG5dO1xuZXhwb3J0IGNvbnN0IFZpZGVvTWltZVR5cGVzID0gW1xuICAgICd2aWRlby94LW1zdmlkZW8nLFxuICAgICd2aWRlby9tcGVnJyxcbiAgICAndmlkZW8vb2dnJyxcbiAgICAndmlkZW8vbXAydCcsXG4gICAgJ3ZpZGVvL3dlYm0nLFxuICAgICd2aWRlby8zZ3BwJyxcbiAgICAndmlkZW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgICAnaW1hZ2UvYm1wJyxcbiAgICAnaW1hZ2UvZ2lmJyxcbiAgICAnaW1hZ2UvanBlZycsXG4gICAgJ2ltYWdlL3BuZycsXG4gICAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAgICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAgICdpbWFnZS90aWZmJyxcbiAgICAnaW1hZ2Uvd2VicCcsXG5dO1xuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAgICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgICAnYXBwbGljYXRpb24vamF2YS1hcmNoaXZlJyxcbiAgICAnYXBwbGljYXRpb24veC10YXInLFxuICAgICdhcHBsaWNhdGlvbi96aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuXTtcbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgICAnYXBwbGljYXRpb24veC1mcmVlYXJjJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgICAnYXBwbGljYXRpb24vcnRmJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXTtcbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAgICd0ZXh0L2NzcycsXG4gICAgJ3RleHQvY3N2JyxcbiAgICAndGV4dC9odG1sJyxcbiAgICAndGV4dC9jYWxlbmRhcicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICdhcHBsaWNhdGlvbi9sZCtqc29uJyxcbiAgICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAndGV4dC9wbGFpbicsXG4gICAgJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICAgJ3RleHQveG1sJyxcbl07XG5leHBvcnQgY29uc3QgQmluYXJ5RG9jc01pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAgICdhcHBsaWNhdGlvbi9wZGYnLFxuXTtcbmV4cG9ydCBjb25zdCBGb250TWltZVR5cGVzID0gW1xuICAgICdmb250L290ZicsXG4gICAgJ2ZvbnQvdHRmJyxcbiAgICAnZm9udC93b2ZmJyxcbiAgICAnZm9udC93b2ZmMicsXG5dO1xuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgICAnYXBwbGljYXRpb24veC1odHRwZC1waHAnLFxuICAgICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICd2bmQudmlzaW8nLFxuICAgICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl07XG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAgIC4uLkF1ZGlvTWltZVR5cGVzLFxuICAgIC4uLlZpZGVvTWltZVR5cGVzLFxuICAgIC4uLkltYWdlTWltZVR5cGVzLFxuICAgIC4uLkNvbXByZXNzZWRNaW1lVHlwZXMsXG4gICAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gICAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgICAuLi5CaW5hcnlEb2NzTWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuICAgIC4uLkZvbnRNaW1lVHlwZXMsXG4gICAgLi4uT3RoZXJNaW1lVHlwZXMsXG5dO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBdWRpb01pbWVUeXBlcywgSW1hZ2VNaW1lVHlwZXMgfSBmcm9tICcuLi90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMnO1xuY29uc3QgU2luZ2xlRmlsZSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wcztcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgICBpZiAobWltZVR5cGUgJiYgSW1hZ2VNaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHBhdGgsIHN0eWxlOiB7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9LCBhbHQ6IG5hbWUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIsIHsgY29udHJvbHM6IHRydWUsIHNyYzogcGF0aCB9LFxuICAgICAgICAgICAgICAgIFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlXCIsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCJhdWRpb1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJhY2tcIiwgeyBraW5kOiBcImNhcHRpb25zXCIgfSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBhczogXCJhXCIsIGhyZWY6IHBhdGgsIG1sOiBcImRlZmF1bHRcIiwgc2l6ZTogXCJzbVwiLCByb3VuZGVkOiB0cnVlLCB0YXJnZXQ6IFwiX2JsYW5rXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIkRvY3VtZW50RG93bmxvYWRcIiwgY29sb3I6IFwid2hpdGVcIiwgbXI6IFwiZGVmYXVsdFwiIH0pLFxuICAgICAgICAgICAgbmFtZSkpKTtcbn07XG5jb25zdCBGaWxlID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBsZXQgcGF0aCA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlTmFtZVByb3BlcnR5ID8gY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgOiBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHlcbiAgICAgICAgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KTtcbiAgICBpZiAoIXByb3BlcnR5LmN1c3RvbS5tdWx0aXBsZSkge1xuICAgICAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgICAgICAgcGF0aCA9IGAke2N1c3RvbS5vcHRzLmJhc2VVcmx9LyR7bmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IHBhdGg6IHBhdGgsIG5hbWU6IG5hbWUsIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlIH0pKTtcbiAgICB9XG4gICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGN1c3RvbS5vcHRzLmJhc2VVcmwgfHwgJyc7XG4gICAgICAgIHBhdGggPSBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IGAke2Jhc2VVcmx9LyR7bmFtZVtpbmRleF19YCk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IGtleTogc2luZ2xlUGF0aCwgcGF0aDogc2luZ2xlUGF0aCwgbmFtZTogbmFtZVtpbmRleF0sIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlW2luZGV4XSB9KSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRmlsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgTGlzdCA9IChwcm9wcykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogMTAwLCAuLi5wcm9wcyB9KSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIiwiaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgU2hvdyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGaWxlLCB7IHdpZHRoOiBcIjEwMCVcIiwgLi4ucHJvcHMgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaG93O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgQ2FydEl0ZW1zUHJldmlldyBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvY2FydC1pdGVtcy1wcmV2aWV3J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DYXJ0SXRlbXNQcmV2aWV3ID0gQ2FydEl0ZW1zUHJldmlld1xuaW1wb3J0IFBhc3N3b3JkRWRpdENvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcGFzc3dvcmRzL2J1aWxkL2NvbXBvbmVudHMvUGFzc3dvcmRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5QYXNzd29yZEVkaXRDb21wb25lbnQgPSBQYXNzd29yZEVkaXRDb21wb25lbnRcbmltcG9ydCBVcGxvYWRFZGl0Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRFZGl0Q29tcG9uZW50ID0gVXBsb2FkRWRpdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZExpc3RDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZExpc3RDb21wb25lbnQgPSBVcGxvYWRMaXN0Q29tcG9uZW50XG5pbXBvcnQgVXBsb2FkU2hvd0NvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkU2hvd0NvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkU2hvd0NvbXBvbmVudCA9IFVwbG9hZFNob3dDb21wb25lbnQiXSwibmFtZXMiOlsiQm9va1N0YXR1cyIsIkJvb2tDYXRlZ29yeSIsImJvb2tTdGF0dXNOdW1Ub1N0cmluZyIsInN0YXR1cyIsIk5ldyIsIlVzZWQiLCJCb29rQ2F0ZWdvcnlOdW1Ub1N0cmluZyIsImNhdGVnb3J5IiwiRHJhbWEiLCJGYW50YXN5IiwiQWN0aW9uIiwiUm9tYW5jZSIsIldhciIsIlBzeWNob2xvZ3kiLCJUaHJpbGxlciIsIkNvbWVkeSIsInRyYW5zZm9ybVBhcmFtcyIsInBhcmFtcyIsInJlc3VsdCIsImtleSIsInZhbHVlIiwia2V5cyIsInNwbGl0IiwiY3VycmVudCIsImkiLCJsZW5ndGgiLCJwYXJ0IiwiaXNOYU4iLCJwYXJzZUludCIsImxhc3RLZXkiLCJDYXJ0SXRlbXNQcmV2aWV3IiwicHJvcHMiLCJyZWNvcmQiLCJjb25zb2xlIiwibG9nIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwiY29sb3IiLCJtYXJnaW5Cb3R0b20iLCJmb250V2VpZ2h0IiwiTGFiZWwiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImNhcnRJdGVtcyIsIm1hcCIsIml0ZW0iLCJCb3giLCJpZCIsImdhcCIsInNyYyIsImJvb2siLCJ1cmwiLCJhbHQiLCJ0aXRsZSIsIndpZHRoIiwiaGVpZ2h0IiwiYm9yZGVyUmFkaXVzIiwiYm9va1ByaWNlIiwicXVhbnRpdHkiLCJQYXNzd29yZEVkaXQiLCJvbkNoYW5nZSIsInByb3BlcnR5IiwicmVzb3VyY2UiLCJ0cmFuc2xhdGVCdXR0b24iLCJ0YiIsInVzZVRyYW5zbGF0aW9uIiwic2hvd1Bhc3N3b3JkIiwidG9nZ2xlUGFzc3dvcmQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIm5hbWUiLCJCYXNlUHJvcGVydHlDb21wb25lbnQiLCJQYXNzd29yZCIsIkVkaXQiLCJtYiIsIlRleHQiLCJ0ZXh0QWxpZ24iLCJCdXR0b24iLCJvbkNsaWNrIiwidHlwZSIsImZsYXQiLCJGb3JtR3JvdXAiLCJEcm9wWm9uZSIsIkRyb3Bab25lSXRlbSIsIkljb24iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJQYXNzd29yZEVkaXRDb21wb25lbnQiLCJVcGxvYWRFZGl0Q29tcG9uZW50IiwiVXBsb2FkTGlzdENvbXBvbmVudCIsIlVwbG9hZFNob3dDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU8sSUFBSUEsVUFBVSxDQUFBO0lBQ3JCLENBQUMsVUFBVUEsVUFBVSxFQUFFO01BQ25CQSxVQUFVLENBQUNBLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUE7TUFDekNBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtJQUMvQyxDQUFDLEVBQUVBLFVBQVUsS0FBS0EsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDNUIsSUFBSUMsWUFBWSxDQUFB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LENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ2hELFlBQVksSUFBSSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRCxTQUFTO0lBQ1QsUUFBUSxRQUFRakQsd0JBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7SUFDL0csS0FBSztJQUNMLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQzVDLFFBQVEsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2xELFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxLQUFLO0lBQ0wsSUFBSSxRQUFRQSx3QkFBSyxDQUFDLGFBQWEsQ0FBQ0Esd0JBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxNQUFNQSx3QkFBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQzlOLENBQUM7O0lDekNELE1BQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxNQUFNQSx3QkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQzs7SUNFN0UsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUs7SUFDeEIsSUFBSSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQy9CLElBQUksTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUdrQyxzQkFBYyxFQUFFLENBQUM7SUFDbkQsSUFBSSxRQUFRbEMsd0JBQUssQ0FBQyxhQUFhLENBQUNrRCxzQkFBUyxFQUFFLElBQUk7SUFDL0MsUUFBUWxELHdCQUFLLENBQUMsYUFBYSxDQUFDUyxrQkFBSyxFQUFFLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRyxRQUFRVCx3QkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2pFLENBQUM7O0lDVkRzRCxPQUFPLENBQUNDLGNBQWMsR0FBRyxFQUFFLENBQUE7SUFFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDNUQsZ0JBQWdCLEdBQUdBLGdCQUFnQixDQUFBO0lBRTFEMkQsT0FBTyxDQUFDQyxjQUFjLENBQUNDLHFCQUFxQixHQUFHQSxZQUFxQixDQUFBO0lBRXBFRixPQUFPLENBQUNDLGNBQWMsQ0FBQ0UsbUJBQW1CLEdBQUdBLElBQW1CLENBQUE7SUFFaEVILE9BQU8sQ0FBQ0MsY0FBYyxDQUFDRyxtQkFBbUIsR0FBR0EsSUFBbUIsQ0FBQTtJQUVoRUosT0FBTyxDQUFDQyxjQUFjLENBQUNJLG1CQUFtQixHQUFHQSxJQUFtQjs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlsyLDMsNCw1LDYsN119
