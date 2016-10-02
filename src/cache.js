let development = false

let cache_to_console = (...messages) => {
  if(development) {
    console.log(...messages)
  }
}

let caches = {      // the default caches
  status: [],
  components: [],
  events: [],
  render_cache: {}
}

let cache_types = { // caches with corresponding cache type
  'status': 'array',
  'components': 'array',
  'events': 'array',
  'render_cache': 'object'
}

let cache_protected = { // different levels of protection (0: no protection, deletion
  'status': 2,          // is allowed, 1: deletion is not allowed but setting the whole
  'components': 2,      // cache to a new value is, 2: only adding to the cache is allowed)
  'events': 1
}

let write = (cache_name, ...values) => {  // adding to a cache (type of interaction based on cache type)
  cache_to_console(...values)
  if(caches[cache_name] === undefined) {
    write('status', 'cache with the name ' + cache_name + ' does not exist ("CACHE:WRITE").')
    return false
  } else {
    if(cache_types[cache_name] === 'array') {           // array: adding items to the array
      caches[cache_name].push(...values)
      return true
    } else if(cache_types[cache_name] === 'object') {   // object: adding {key: value} pairs
      if(values.length < 2) {
        write('status', 'amount of arguments is too low, 2 arguments are required: ' + values + ' ("CACHE:WRITE").')
        return false
      }
      caches[cache_name][values[0]] = values[1]
      return true
    } else if(cache_types[cache_name] === 'number') {   // adding to the number (used for incrementing, negative numbers used for decrementing)
      caches[cache_name] += values[0]
      return true
    } else if(cache_types[cache_name] === 'string') {   // adding to a string (no real use case as of now but it is available)
      caches[cache_name] += values[0]
      return true
    } else {
      write('status', 'some error occured (in "CACHE:WRITE").')
      return false
    }
  }
}

let change = (cache_name, location, value) => {
  cache_to_console(location, value)
  if(caches[cache_name] === undefined) {
    write('status', 'cache with the name ' + cache_name + ' does not exist ("CACHE:CHANGE").')
    return false
  } else {
    if(cache_types[cache_name] === 'array') {
      if(caches[cache_name][location] = value){
        return true
      } else {
        return false
      }
    } else if(cache_types[cache_name] === 'object') {
      if(caches[cache_name][location] = value) {
        return true
      } else {
        return false
      }
    }
  }
}

let set = (cache_name, value) => {                      // setting the value of a complete cache
  if(caches[cache_name] === undefined) {                // (only if the cache has a protection level of less than 2)
    cache_to_console(value)
    write('status', 'cache with the name ' + cache_name + ' does not exist ("CACHE:SET").')
    return false
  } else if(cache_protected[cache_name] <= 1) {
    caches[cache_name] = value
    return true
  } else {
    write('status', 'cache with protection level ' + cache_protected[cache_name] + 'does not allow this change ("CACHE:SET").')
  }
}

let read = (cache_name, location) => {                  // reading from a cache (allowed for all caches regardless of protection level)
  if(caches[cache_name] === undefined) {
    write('status', 'cache with the name ' + cache_name + ' does not exist ("CACHE:READ").')
    return false
  } else {
    if(cache_types[cache_name] === 'array' && location) {
      return caches[cache_name][location]
    } else if(cache_types[cache_name] === 'object' && location) {
      return caches[cache_name][location]
    } else {
      return caches[cache_name]
    }
  }
}

let create = (cache_name, type='array') => {            // create a new cache (optional types are: array([]), object({}), number(0), string('') ; default is array)
  if(caches[cache_name] !== undefined) {
    write('status', 'a cache with this name exists already ("CACHE:CREATE").')

    return false
  } else {
    if(type === 'array') {                              // setting the cache type
      caches[cache_name] = []
      cache_types[cache_name] = type
    } else if(type === 'object') {
      caches[cache_name] = {}
      cache_types[cache_name] = type
    } else if(type === 'number') {
      caches[cache_name] = 0
      cache_types[cache_name] = type
    } else if(type === 'string') {
      caches[cache_name] = ''
      cache_types[cache_name] = type
    } else {
      write('status', 'type not available: ' + type + ' ("CACHE:CREATE").')
      return false
    }
    cache_to_console('cache created: ' + cache_name)
    return true
  }
}

let del = (cache_name) => {                             // deleting a cache (protection level 0 only)
  if(caches[cache_name] === undefined) {
    write('status', 'cache with the name ' + cache_name + ' does not exist ("CACHE:DEL").')
    return false
  } else if(cache_protected[cache_name] >= 1) {
    write('status', 'deleting cache ' + cache_name + ' with protection level greater than or equal to 1 is not allowed ("CACHE:DEL").')
    return false
  } else {
    return delete caches[cache_name]
  }
}

let help = {                                            // listing all cache types and commands
  types: ['array', 'object', 'number', 'string'],
  methods: ['write', 'set', 'change', 'read', 'create, del'],
}

export default { write, set, change, read, create, del, help }
