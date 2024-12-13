import { FileInput } from '../ui/file-input'
import { Block } from './block'

export function BlockLogo() {
  return (
    <Block info="Блок 4" title="Логотип">
      <FileInput
        inputProps={{
          id: 'input-logo',
          accept: '.svg, .png',
        }}
      />
    </Block>
  )
}
