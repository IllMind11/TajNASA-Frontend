import { Cross2Icon } from '@radix-ui/react-icons';
import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';

import { Button } from './button';
import { ScrollArea } from './scroll-area';

type Options = Record<'value' | 'label', string | number>;

type MultiSelectProps = {
  options: Options[];
  placeholder: string;
  onChange: any;
  value: number[];
};

export function MultiSelect({
  options,
  placeholder,
  onChange,
  value,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Options[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback((option: Options) => {
    setSelected((prev) => prev.filter((s) => s.value !== option.value));
  }, []);

  const handleUnselectId = React.useCallback(
    (id: number | string) => {
      return value.filter((s) => id !== s);
    },
    [value],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });

            const newValues = [...value];
            newValues.pop();
            onChange(newValues);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [onChange, value],
  );

  const selectables = options.filter((option) => !selected.includes(option));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => {
            return (
              <Badge key={option.value} variant="secondary">
                {option.label}
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-1.5 text-muted-foreground hover:text-foreground"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option);
                      onChange(handleUnselectId(option.value));
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => {
                    handleUnselect(option);
                    onChange(handleUnselectId(option.value));
                  }}
                >
                  <Cross2Icon className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              <ScrollArea className="h-[300px] w-full">
                {selectables.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue('');
                        setSelected((prev) => [...prev, option]);
                        onChange([...value, option.value]);
                      }}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </ScrollArea>
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
