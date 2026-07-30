# CMS Engine

Content Management architecture. **Architecture only** — no end-user editing features.

```
src/cms/
  content/     contentContract.js        section/block/document contracts + factories
               contentManager.js         normalize / sort / resolve / createDefault
               invitationContentAdapter.js  legacy invitation -> content document
  sections/    sectionTypes.js           built-in section type definitions
  blocks/      blockTypes.js             built-in block type definitions
  registry/    sectionTypeRegistry.js    configuration-driven type catalogues
               blockTypeRegistry.js
  validators/  contentValidator.js       pure issue reporting
  serializers/ contentSerializer.js      JSON + legacy projections
               sortUtils.js
  localization/localizationService.js    locale resolution extension point
  extensionPoints.js                     declared, unimplemented capabilities
```

## Contracts

Section: `{ id, type, enabled, order, blocks, settings, metadata }`
Block:   `{ id, type, value, style, visibility, metadata }`

No section- or block-specific structure exists outside these contracts; type
behaviour lives in the registries.

## Data flow

```
Event -> toInvitationView -> contentFromInvitation -> normalizeContent
      -> resolveContent -> { sections, data } -> view model -> Renderer
```

The renderer and the section registry are unchanged: they still receive the
legacy per-section data shape, now produced by the CMS serializer.

## Extending

```js
import { registerBlockType, registerSectionType } from "@/cms";
registerBlockType({ type: "rsvp", defaultValue: {}, normalize: (v) => v });
registerSectionType({ type: "rsvp", allowedBlocks: ["rsvp"], toData: (s) => s.blocks[0]?.value });
```

No conditionals, no renderer changes.
