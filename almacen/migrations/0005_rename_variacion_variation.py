# Generated by Django 4.2.1 on 2023-05-12 07:01

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("carts", "0002_cartitem_variations"),
        ("almacen", "0004_alter_variacion_options"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Variacion",
            new_name="Variation",
        ),
    ]
