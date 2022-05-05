import {ViewMode} from '../app-state'

export interface HashParams {
  profileURL?: string
  title?: string
  localProfilePath?: string
  view?: ViewMode
}

export function getViewMode(value: string): ViewMode | undefined {
  switch (value) {
    case 'chrono': return ViewMode.CHRONO_FLAME_CHART
    case 'leftheavy': return ViewMode.LEFT_HEAVY_FLAME_GRAPH
    case 'sandwich': return ViewMode.SANDWICH_VIEW
  }
  return undefined
}

export function getHashParams(hashContents = window.location.hash): HashParams {
  try {
    if (!hashContents.startsWith('#')) {
      return {}
    }
    const components = hashContents.substr(1).split('&')
    const result: HashParams = {}
    for (const component of components) {
      let [key, value] = component.split('=')
      value = decodeURIComponent(value)
      if (key === 'profileURL') {
        result.profileURL = value
      } else if (key === 'title') {
        result.title = value
      } else if (key === 'localProfilePath') {
        result.localProfilePath = value
      } else if (key == 'view') {
        result.view = getViewMode(value)
      }
    }
    return result
  } catch (e) {
    console.error(`Error when loading hash fragment.`)
    console.error(e)
    return {}
  }
}
