"use strict";


function deepcopy(obj) {
    
    let orig_objects = [];
    let copy_objects = [];
   
    function deepcopy_(obj_) {
        if (!obj_ || typeof obj_ !== 'object') return obj_;

        const idx = orig_objects.indexOf(obj_);
        if (idx !== -1) return copy_objects[idx];

        let copy_ = obj_.constructor === Array ? [] : {};
        orig_objects.push(obj_);
        copy_objects.push(copy_);

        for (let key in obj_) copy_[key] = deepcopy_(obj_[key]);
        return copy_;
    }
    return deepcopy_(obj);
}


module.exports = {
    deepcopy: deepcopy,
};
