import { version } from '../../../config/environment'

const versionQueries = {
  version: async () => {
    return version
  }
}

export default versionQueries
