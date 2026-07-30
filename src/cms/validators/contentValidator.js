/**
 * Content Validators
 * ------------------
 * Pure, registry-driven validation. Returns issue lists; never throws,
 * never mutates, never logs.
 *
 * Issue: { level: "error"|"warning", path, code, message }
 */
import { isBlock, isContentDocument, isSection } from "../content/contentContract";
import { getBlockType } from "../registry/blockTypeRegistry";
import { getSectionType, isBlockAllowed } from "../registry/sectionTypeRegistry";

const issue = (level, path, code, message) => ({ level, path, code, message });

export function validateBlock(block, path = "block") {
  if (!isBlock(block)) return [issue("error", path, "invalid_block", "Block does not match the block contract")];
  const def = getBlockType(block.type);
  if (!def) return [issue("error", `${path}.type`, "unknown_block_type", `Unknown block type "${block.type}"`)];
  return def
    .validate(block)
    .map((i) => issue(i.level || "error", `${path}.${i.path || "value"}`, i.code || "invalid", i.message || "Invalid block"));
}

export function validateSection(section, path = "section") {
  if (!isSection(section)) return [issue("error", path, "invalid_section", "Section does not match the section contract")];
  const def = getSectionType(section.type);
  const issues = [];
  if (!def) issues.push(issue("error", `${path}.type`, "unknown_section_type", `Unknown section type "${section.type}"`));
  if (!section.id) issues.push(issue("error", `${path}.id`, "required", "Section id is required"));

  section.blocks.forEach((block, i) => {
    issues.push(...validateBlock(block, `${path}.blocks[${i}]`));
    if (def && !isBlockAllowed(section.type, block.type)) {
      issues.push(issue("warning", `${path}.blocks[${i}].type`, "block_not_allowed", `Block "${block.type}" is not allowed in "${section.type}"`));
    }
  });
  return issues;
}

export function validateContent(document) {
  if (!isContentDocument(document)) {
    return { valid: false, issues: [issue("error", "content", "invalid_document", "Not a content document")] };
  }
  const issues = [];
  const seen = new Set();
  document.sections.forEach((section, i) => {
    issues.push(...validateSection(section, `sections[${i}]`));
    if (seen.has(section.id)) issues.push(issue("error", `sections[${i}].id`, "duplicate_id", `Duplicate section id "${section.id}"`));
    seen.add(section.id);
  });
  return { valid: !issues.some((i) => i.level === "error"), issues };
}
